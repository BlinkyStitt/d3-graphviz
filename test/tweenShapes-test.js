import tape from "./tape.js";
import jsdom from "./jsdom.js";
import * as d3 from "d3-selection";
import * as d3_transition from "d3-transition";
import * as d3_graphviz from "../index.js";

tape("graphviz().tweenShapes() enables and disables shape tweening during transitions.", async function (test) {

    var window = global.window = jsdom('<div id="graph"></div>');
    var document = global.document = window.document;
    var graphviz;

    await new Promise(resolve => {
        graphviz = d3_graphviz.graphviz("#graph")
            .on('initEnd', resolve);
    });

    graphviz
        .tweenShapes(true)
        .zoom(false)
        .tweenPaths(true)
        .convertEqualSidedPolygons(false)
        .dot('digraph {a -> b;}')
        .render();
    test.equal(d3.selectAll('.node').size(), 2, 'Number of initial nodes');
    test.equal(d3.selectAll('.edge').size(), 1, 'Number of initial edges');
    test.equal(d3.selectAll('ellipse').size(), 2, 'Number of initial ellipses');
    test.equal(d3.selectAll('polygon').size(), 2, 'Number of initial polygons');
    test.equal(d3.selectAll('path').size(), 1, 'Number of initial paths');

    await new Promise(resolve => {
        const transition1 = d3_transition.transition().duration(0);
        graphviz
            .dot('digraph {a [shape="box"];a -> b}')
            .transition(transition1)
            .render()
            .on("end", resolve);
        test.equal(d3.selectAll('.node').size(), 2, 'Number of nodes immediately after rendering');
        test.equal(d3.selectAll('.edge').size(), 1, 'Number of edges immediately after rendering');
        test.equal(d3.selectAll('ellipse').size(), 1, 'Number of ellipses immediately after rendering');
        test.equal(d3.selectAll('polygon').size(), 2, 'Number of polygons immediately after rendering');
        test.equal(d3.selectAll('path').size(), 2, 'Number of paths immediately after rendering');
    });

    test.equal(d3.selectAll('.node').size(), 2, 'Number of nodes after shape change');
    test.equal(d3.selectAll('.edge').size(), 1, 'Number of edges after shape change');
    test.equal(d3.selectAll('ellipse').size(), 1, 'Number of ellipses after shape change');
    test.equal(d3.selectAll('polygon').size(), 3, 'Number of polygons after shape change');
    test.equal(d3.selectAll('path').size(), 1, 'Number of paths after shape change');

    await new Promise(resolve => {
        const transition1 = d3_transition.transition().duration(0);
        graphviz
            .dot('digraph {node [shape="triangle"];a -> b}')
            .transition(transition1)
            .render()
            .on("end", resolve);

        test.equal(d3.selectAll('.node').size(), 2, 'Number of nodes immediately after rendering');
        test.equal(d3.selectAll('.edge').size(), 1, 'Number of edges immediately after rendering');
        test.equal(d3.selectAll('ellipse').size(), 0, 'Number of ellipses immediately after rendering');
        test.equal(d3.selectAll('polygon').size(), 2, 'Number of polygons immediately after rendering');
        test.equal(d3.selectAll('path').size(), 3, 'Number of paths immediately after rendering');
    });

    test.equal(d3.selectAll('.node').size(), 2, 'Number of nodes after shape change');
    test.equal(d3.selectAll('.edge').size(), 1, 'Number of edges after shape change');
    test.equal(d3.selectAll('ellipse').size(), 0, 'Number of ellipses after shape change');
    test.equal(d3.selectAll('polygon').size(), 4, 'Number of polygons after shape change');
    test.equal(d3.selectAll('path').size(), 1, 'Number of paths after shape change');

    test.end();
});
