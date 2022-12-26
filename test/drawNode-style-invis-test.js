import tape from "./tape.js";
import jsdom from "./jsdom.js";
import deepEqualData from "./deepEqualData.js";
import * as d3 from "d3-selection";
import * as d3_graphviz from "../index.js";
import {translatePointsAttribute} from "../src/svg.js";

tape("No node is drawn when style is invis.", function(test) {
    var window = global.window = jsdom('<div id="expected-graph"></div><div id="actual-graph"></div>');
    var document = global.document = window.document;
    var expectedGraph = d3.select("#expected-graph");
    var actualGraph = d3.select("#actual-graph");
    var actualGraphviz;
    var expectedGraphviz = d3_graphviz.graphviz("#expected-graph")
        .on('initEnd', () => {
            actualGraphviz = d3_graphviz.graphviz("#actual-graph")
                .on('initEnd', startTest);
        });

    function startTest() {
        expectedGraphviz
            .zoom(false)
            .renderDot('digraph {a [style="invis"]}', function () {
                actualGraphviz
                    .renderDot('digraph {}', function () {
                        var x = 30.64645;
                        var y = -30.9504;
                        actualGraphviz
                        .drawNode(x, y, 'a', {shape: 'box', style: 'invis', id: 'node1'})
                            .insertDrawnNode('a');

                        const expectedNodeGroup = expectedGraph.selectAll('.node');

                        const actualNodeGroup = actualGraph.selectAll('.node');

                        test.equal(expectedNodeGroup.size(), 0, 'No node is generated by Graphviz when style is invis');
                        test.equal(actualNodeGroup.size(), 0, 'No node is drawn when style is invis');

                        test.end();
                    });
            });
    }
});

tape("Updating of a node with style invis is ignored.", function(test) {
    var window = global.window = jsdom('<div id="expected-graph"></div><div id="actual-graph"></div>');
    var document = global.document = window.document;
    var expectedGraph = d3.select("#expected-graph");
    var actualGraph = d3.select("#actual-graph");
    var actualGraphviz;
    var expectedGraphviz = d3_graphviz.graphviz("#expected-graph")
        .on('initEnd', () => {
            actualGraphviz = d3_graphviz.graphviz("#actual-graph")
                .on('initEnd', startTest);
        });

    function startTest() {
        expectedGraphviz
            .zoom(false)
            .renderDot('digraph {a [style="invis"]}', function () {
                actualGraphviz
                    .renderDot('digraph {}', function () {
                        var x = 30.64645;
                        var y = -30.9504;
                        actualGraphviz
                        .drawNode(x, y, 'a', {shape: 'box', style: 'invis', id: 'node1'})
                            .updateDrawnNode(x + 1, y + 1, 'b', {color: 'green'})
                            .insertDrawnNode('a');

                        const expectedNodeGroup = expectedGraph.selectAll('.node');

                        const actualNodeGroup = actualGraph.selectAll('.node');

                        test.equal(expectedNodeGroup.size(), 0, 'No node is generated by Graphviz when style is invis');
                        test.equal(actualNodeGroup.size(), 0, 'No node is drawn when style is invis');

                        test.end();
                    });
            });
    }
});

tape("Moving a node with style invis is ignored.", function(test) {
    var window = global.window = jsdom('<div id="expected-graph"></div><div id="actual-graph"></div>');
    var document = global.document = window.document;
    var expectedGraph = d3.select("#expected-graph");
    var actualGraph = d3.select("#actual-graph");
    var actualGraphviz;
    var expectedGraphviz = d3_graphviz.graphviz("#expected-graph")
        .on('initEnd', () => {
            actualGraphviz = d3_graphviz.graphviz("#actual-graph")
                .on('initEnd', startTest);
        });

    function startTest() {
        expectedGraphviz
            .zoom(false)
            .renderDot('digraph {a [style="invis"]}', function () {
                actualGraphviz
                    .renderDot('digraph {}', function () {
                        var x = 30.64645;
                        var y = -30.9504;
                        actualGraphviz
                            .drawNode(x, y, 'a', {shape: 'box', style: 'invis', id: 'node1'})
                            .moveDrawnNode(x + 1, y + 1)
                            .insertDrawnNode('a');

                        const expectedNodeGroup = expectedGraph.selectAll('.node');

                        const actualNodeGroup = actualGraph.selectAll('.node');

                        test.equal(expectedNodeGroup.size(), 0, 'No node is generated by Graphviz when style is invis');
                        test.equal(actualNodeGroup.size(), 0, 'No node is drawn when style is invis');

                        test.end();
                    });
            });
    }
});

tape("Removal of a node with style invis is allowed.", function(test) {
    var window = global.window = jsdom('<div id="expected-graph"></div><div id="actual-graph"></div>');
    var document = global.document = window.document;
    var expectedGraph = d3.select("#expected-graph");
    var actualGraph = d3.select("#actual-graph");
    var actualGraph = d3.select("#actual-graph");
    var actualGraphviz;
    var expectedGraphviz = d3_graphviz.graphviz("#expected-graph")
        .on('initEnd', () => {
            actualGraphviz = d3_graphviz.graphviz("#actual-graph")
                .on('initEnd', startTest);
        });

    function startTest() {
        expectedGraphviz
            .zoom(false)
            .renderDot('digraph {a [style="invis"]}', function () {
                actualGraphviz
                    .renderDot('digraph {}', function () {
                        var x = 30.64645;
                        var y = -30.9504;
                        actualGraphviz
                            .drawNode(x, y, 'a', {shape: 'box', style: 'invis', id: 'node1'})
                            .removeDrawnNode();

                        const expectedNodeGroup = expectedGraph.selectAll('.node');

                        const actualNodeGroup = actualGraph.selectAll('.node');

                        test.equal(expectedNodeGroup.size(), 0, 'No node is generated by Graphviz when style is invis');
                        test.equal(actualNodeGroup.size(), 0, 'No node is drawn when style is invis');

                        test.end();
                    });
            });
    }
});

tape("Changing a node with style invis to a visible node is allowed.", function(test) {
    var window = global.window = jsdom('<div id="expected-graph"></div><div id="actual-graph"></div>');
    var document = global.document = window.document;
    var expectedGraph = d3.select("#expected-graph");
    var actualGraph = d3.select("#actual-graph");
    var actualGraphviz;
    var expectedGraphviz = d3_graphviz.graphviz("#expected-graph")
        .on('initEnd', () => {
            actualGraphviz = d3_graphviz.graphviz("#actual-graph")
                .on('initEnd', startTest);
        });

    function startTest() {
        expectedGraphviz
            .zoom(false)
            .renderDot('digraph {a [shape=box]}', function () {
                actualGraphviz
                    .renderDot('digraph {}', function () {
                        var x = 27;
                        var y = -18;
                        actualGraphviz
                        .drawNode(x, y, 'a', {shape: 'box', style: 'invis', id: 'node1'})
                            .updateDrawnNode(x, y, 'a', {style: 'solid'})
                            .insertDrawnNode('a');

                        const expectedNodeGroup = expectedGraph.selectAll('.node');

                        const actualNodeGroup = actualGraph.selectAll('.node');

                        test.equal(expectedNodeGroup.size(), 1, 'A node is generated by Graphviz when style is not invis');
                        test.equal(actualNodeGroup.size(), 1, 'A node is drawn when style is changed from invis');

                        const expectedNodeTitle = expectedNodeGroup.selectAll('title');
                        const expectedNodeShape = expectedNodeGroup.selectAll('polygon');
                        const expectedNodeText = expectedNodeGroup.selectAll('text');

                        const actualNodeTitle = actualNodeGroup.selectAll('title');
                        const actualNodeShape = actualNodeGroup.selectAll('polygon');
                        const actualNodeText = actualNodeGroup.selectAll('text');

                        test.equal(actualNodeShape.size(), 1, 'A node is drawn with the originally specified shape when style is changed from invis');

                        var bbox = expectedNodeShape.node().getBBox();
                        bbox.cx = bbox.x + bbox.width / 2;
                        bbox.cy = bbox.y + bbox.height / 2;
                        var xoffs = x - bbox.cx;
                        var yoffs = y - bbox.cy;

                        test.equal(actualNodeGroup.attr("id"), expectedNodeGroup.attr("id"), 'id of group');

                        test.equal(actualNodeTitle.text(), expectedNodeTitle.text(), 'text of title');

                        test.equal(actualNodeShape.attr("fill"), expectedNodeShape.attr("fill"), 'fill of polygon');
                        test.equal(actualNodeShape.attr("stroke"), expectedNodeShape.attr("stroke"), 'stroke of polygon');
                        test.equal(actualNodeShape.attr("points"), translatePointsAttribute(expectedNodeShape.attr("points"), xoffs, yoffs), 'points of polygon');

                        test.equal(actualNodeText.attr("text-anchor"), expectedNodeText.attr("text-anchor"), 'text-anchor of text');
                        test.equal(+actualNodeText.attr("x"), +expectedNodeText.attr("x") + xoffs, 'x of text');
                        test.equal(+actualNodeText.attr("y"), +expectedNodeText.attr("y") + yoffs, 'y of text');
                        test.equal(actualNodeText.attr("font-family"), expectedNodeText.attr("font-family"), 'font-family of text');
                        test.equal(actualNodeText.attr("font-size"), expectedNodeText.attr("font-size"), 'font-size of text');
                        test.equal(actualNodeText.attr("fill"), expectedNodeText.attr("fill"), 'fill of text');

                        test.equal(actualNodeText.text(), expectedNodeText.text(), 'text of node group');

                        var actualNodeGroupDatum = actualNodeGroup.datum();
                        var expectedNodeGroupDatum = expectedNodeGroup.datum();
                        delete expectedNodeGroupDatum.parent;
                        deepEqualData(test, actualNodeGroupDatum, expectedNodeGroupDatum, 'data of drawn node of shape equals Graphviz generated data');

                        test.end();
                    });
            });
    }
});
