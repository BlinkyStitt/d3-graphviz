import assert from "assert";
import it from "./it.js";
import jsdom from "./jsdom.js";
import deepEqualData from "./deepEqualData.js";
import * as d3 from "d3-selection";
import * as d3_graphviz from "../index.js";

it("Verify that circle shape is drawn exactly as Graphviz does.", async () => {
    var window = global.window = jsdom('<div id="expected-graph"></div><div id="actual-graph"></div>');
    global.document = window.document;
    var expectedGraph = d3.select("#expected-graph");
    var actualGraph = d3.select("#actual-graph");
    var actualGraphviz;
    var expectedGraphviz = d3_graphviz.graphviz("#expected-graph");
    await new Promise(resolve => {
        expectedGraphviz
            .on('initEnd', resolve);
    });

    await new Promise(resolve => {
        actualGraphviz = d3_graphviz.graphviz("#actual-graph")
            .on('initEnd', resolve);
    });

    await new Promise(resolve => {
        expectedGraphviz
            .zoom(false)
            .renderDot('digraph {a [shape="circle"]}', resolve);
    });

    await new Promise(resolve => {
        actualGraphviz
            .renderDot('digraph {}', resolve);
    });
    var x = 18;
    var y = -18;
    actualGraphviz
        .drawNode(x, y, 'a', { shape: 'circle', id: 'node1' })
        .insertDrawnNode('a');

    const expectedNodeGroup = expectedGraph.selectAll('.node');
    const expectedNodeTitle = expectedNodeGroup.selectAll('title');
    const expectedNodeShape = expectedNodeGroup.selectAll('ellipse');
    const expectedNodeText = expectedNodeGroup.selectAll('text');

    const actualNodeGroup = actualGraph.selectAll('.node');
    const actualNodeTitle = actualNodeGroup.selectAll('title');
    const actualNodeShape = actualNodeGroup.selectAll('ellipse');
    const actualNodeText = actualNodeGroup.selectAll('text');

    var bbox = expectedNodeShape.node().getBBox();
    bbox.cx = bbox.x + bbox.width / 2;
    bbox.cy = bbox.y + bbox.height / 2;
    var xoffs = x - bbox.cx;
    var yoffs = y - bbox.cy;

    assert.equal(actualNodeGroup.attr("id"), expectedNodeGroup.attr("id"), 'id of group');

    assert.equal(actualNodeTitle.text(), expectedNodeTitle.text(), 'text of title');

    assert.equal(actualNodeShape.attr("fill"), expectedNodeShape.attr("fill"), 'fill of ellipse');
    assert.equal(actualNodeShape.attr("stroke"), expectedNodeShape.attr("stroke"), 'stroke of ellipse');
    assert.equal(+actualNodeShape.attr("cx"), +expectedNodeShape.attr("cx") + xoffs, 'cx of ellipse');
    assert.equal(+actualNodeShape.attr("cy"), +expectedNodeShape.attr("cy") + yoffs, 'cy of ellipse');
    assert.equal(+actualNodeShape.attr("rx"), +expectedNodeShape.attr("rx"), 'rx of ellipse');
    assert.equal(+actualNodeShape.attr("ry"), +expectedNodeShape.attr("ry"), 'ry of ellipse');

    assert.equal(actualNodeText.attr("text-anchor"), expectedNodeText.attr("text-anchor"), 'text-anchor of text');
    assert.equal(+actualNodeText.attr("x"), +expectedNodeText.attr("x") + xoffs, 'x of text');
    assert.equal(+actualNodeText.attr("y"), +expectedNodeText.attr("y") + yoffs, 'y of text');
    assert.equal(actualNodeText.attr("font-family"), expectedNodeText.attr("font-family"), 'font-family of text');
    assert.equal(actualNodeText.attr("font-size"), expectedNodeText.attr("font-size"), 'font-size of text');
    assert.equal(actualNodeText.attr("fill"), expectedNodeText.attr("fill"), 'fill of text');

    assert.equal(actualNodeText.text(), expectedNodeText.text(), 'text of node group');

    var actualNodeGroupDatum = actualNodeGroup.datum();
    var expectedNodeGroupDatum = expectedNodeGroup.datum();
    delete expectedNodeGroupDatum.parent;
    deepEqualData(actualNodeGroupDatum, expectedNodeGroupDatum, 'data of drawn node of shape equals Graphviz generated data');

});
