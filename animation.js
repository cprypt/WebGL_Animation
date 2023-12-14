"use strict";

var canvas;
var gl;
var program;

var instanceMatrix;
var modelViewMatrix;
var projectionMatrix;
var modelViewMatrixLoc;
var projectionMatrixLoc;

var vBuffer;
var vPosition;

var theta = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var numNodes = 9;

var pointsArray = [];
var vertices = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0)
];

var figure = [];
for (var i = 0; i < numNodes; i++) figure[i] = createNode(null, null, null, null);

var armBaseId = 0;
var arm1Id = 1;
var arm2Id = 2;
var arm3Id = 3;
var grapBaseId = 4;
var grap1Id = 5;
var grap2Id = 6;
var grap3Id = 7;
var grap4Id = 8;

var armBaseHeight = 0.7;
var armBaseWidth = 3.0;
var armHeight = 4.0;
var armWidth = 0.6;
var grapBaseHeight = 0.5;
var grapBaseWidth = 2.0;
var grapHeight = 3.0;
var grapWidth = 0.4;

var stack = [];

function traverse(Id) {
    if (Id == null) return;
    stack.push(modelViewMatrix);
    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
    figure[Id].render();
    if (figure[Id].child != null) traverse(figure[Id].child);
    modelViewMatrix = stack.pop();
    if (figure[Id].sibling != null) traverse(figure[Id].sibling);
}

var render = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
    traverse(armBaseId);
    requestAnimFrame(render);
}

function scale4(a, b, c) {
    var result = mat4();
    result[0][0] = a;
    result[1][1] = b;
    result[2][2] = c;
    return result;
}

function grap4() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * grapHeight, 0.0));
    instanceMatrix = mult(instanceMatrix, scale4(grapWidth, grapHeight, grapWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function grap3() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * grapHeight, 0.0));
    instanceMatrix = mult(instanceMatrix, scale4(grapWidth, grapHeight, grapWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function grap2() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * grapHeight, 0.0));
    instanceMatrix = mult(instanceMatrix, scale4(grapWidth, grapHeight, grapWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function grap1() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * grapHeight, 0.0));
    instanceMatrix = mult(instanceMatrix, scale4(grapWidth, grapHeight, grapWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function grapBase() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * grapBaseHeight, 0.0));
    instanceMatrix = mult(instanceMatrix, scale4(grapBaseWidth, grapBaseHeight, grapBaseWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function arm3() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * armHeight, 0.0));
    instanceMatrix = mult(instanceMatrix, scale4(armWidth, armHeight, armWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function arm2() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * armHeight, 0.0));
    instanceMatrix = mult(instanceMatrix, scale4(armWidth, armHeight, armWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function arm1() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * armHeight, 0.0));
    instanceMatrix = mult(instanceMatrix, scale4(armWidth, armHeight, armWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function armBase() {
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * armBaseHeight, 0.0));
    instanceMatrix = mult(instanceMatrix, scale4(armBaseWidth, armBaseHeight, armBaseWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for (var i = 0; i < 6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, 4);
}

function createNode(transform, render, sibling, child) {
    var node = {
        transform: transform,
        render: render,
        sibling: sibling,
        child: child,
    }

    return node;
}

function initNodes(Id) {
    var m = mat4();

    switch (Id) {
        case armBaseId:
            m = rotate(theta[armBaseId], 0, 1, 0);
            figure[armBaseId] = createNode(m, armBase, null, arm1Id);
            break;

        case arm1Id:
            m = translate(0.0, armBaseHeight, 0.0);
            m = mult(m, rotate(theta[arm1Id], 1, 0, 0))
            figure[arm1Id] = createNode(m, arm1, null, arm2Id);
            break;

        case arm2Id:
            m = translate(0.0, armHeight, 0.0);
            m = mult(m, rotate(theta[arm2Id], 1, 0, 0));
            figure[arm2Id] = createNode(m, arm2, null, arm3Id);
            break;

        case arm3Id:
            m = translate(0.0, armHeight, 0.0);
            m = mult(m, rotate(theta[arm3Id], 1, 0, 0));
            figure[arm3Id] = createNode(m, arm3, null, grapBaseId);
            break;

        case grapBaseId:
            m = translate(0.0, armHeight, 0.0);
            m = mult(m, rotate(theta[grapBaseId], 0, 1, 0));
            figure[grapBaseId] = createNode(m, grapBase, null, grap1Id);
            break;

        case grap1Id:
            m = translate(0.8, grapBaseHeight, 0.8);
            m = mult(m, rotate(theta[grap1Id], -1, 0, 1));
            figure[grap1Id] = createNode(m, grap1, grap2Id, null);
            break;

        case grap2Id:
            m = translate(0.8, grapBaseHeight, -0.8);
            m = mult(m, rotate(theta[grap2Id], 1, 0, 1));
            figure[grap2Id] = createNode(m, grap2, grap3Id, null);
            break;

        case grap3Id:
            m = translate(-0.8, grapBaseHeight, 0.8);
            m = mult(m, rotate(theta[grap3Id], 1, 0, 1));
            figure[grap3Id] = createNode(m, grap3, grap4Id, null);
            break;

        case grap4Id:
            m = translate(-0.8, grapBaseHeight, -0.8);
            m = mult(m, rotate(theta[grap4Id], -1, 0, 1));
            figure[grap4Id] = createNode(m, grap4, null, null);
            break;
    }
}

function quad(a, b, c, d) {
    pointsArray.push(vertices[a]);
    pointsArray.push(vertices[b]);
    pointsArray.push(vertices[c]);
    pointsArray.push(vertices[d]);
}


function cube() {
    quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(6, 5, 1, 2);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    instanceMatrix = mat4();
    modelViewMatrix = lookAt(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
    projectionMatrix = ortho(-10.0, 10.0, -5.0, 15.0, -10.0, 10.0);
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    cube();

    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    window.onkeydown = function (event) {
        switch (event.key) {
            case "1":
                theta[armBaseId] += 1;
                initNodes(armBaseId);
                break;
            case "2":
                theta[armBaseId] -= 1;
                initNodes(armBaseId);
                break;
            case "q":
                theta[arm1Id] += 1;
                initNodes(arm1Id);
                break;
            case "w":
                theta[arm1Id] -= 1;
                initNodes(arm1Id);
                break;
            case "e":
                theta[arm2Id] += 1;
                initNodes(arm2Id);
                break;
            case "r":
                theta[arm2Id] -= 1;
                initNodes(arm2Id);
                break;
            case "t":
                theta[arm3Id] += 1;
                initNodes(arm3Id);
                break;
            case "y":
                theta[arm3Id] -= 1;
                initNodes(arm3Id);
                break;
            case "a":
                theta[grapBaseId] += 1;
                initNodes(grapBaseId);
                break;
            case "s":
                theta[grapBaseId] -= 1;
                initNodes(grapBaseId);
                break;
            case "d":
                theta[grap1Id] += 1;
                theta[grap2Id] += 1;
                theta[grap3Id] -= 1;
                theta[grap4Id] -= 1;
                initNodes(grap1Id);
                initNodes(grap2Id);
                initNodes(grap3Id);
                initNodes(grap4Id);
                break;
            case "f":
                theta[grap1Id] -= 1;
                theta[grap2Id] -= 1;
                theta[grap3Id] += 1;
                theta[grap4Id] += 1;
                initNodes(grap1Id);
                initNodes(grap2Id);
                initNodes(grap3Id);
                initNodes(grap4Id);
                break;
        }
    }

    for (var i = 0; i < numNodes; i++) initNodes(i);

    render();
}
