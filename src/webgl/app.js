
var app = {
    gl: null,

    start: function() {
        var canvas = document.querySelector('#glcanvas');
        var gl = this.gl = this.initWebGL(canvas);

        if (!gl) return;

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.viewport(0, 0, canvas.width, canvas.height);

        this.initShader();

        var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
        var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

        gl.vertexAttrib4f(a_Position, 0.0, -0.5, 0.0, 1);
        gl.vertexAttrib1f(a_PointSize, 10.0);
        gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0, 1);

        gl.drawArrays(gl.POINTS, 0, 3);
        this.bindEvents(canvas, a_Position);
    },

    initWebGL: function(canvas) {
        return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    },

    bindEvents: function(canvas, a_Position) {
        var body = document.querySelector('body');
        var g_points = [];
        var { height, width } = canvas;
        var rect = canvas.getBoundingClientRect();

        body.addEventListener('click', (e) => {
            var { clientX, clientY } = e;
            var [x, y] = [
                ((clientX - rect.left) - width/2) / (width/2),
                (height/2 - (clientY - rect.top)) / (height/2),
            ];

            g_points.push([x, y]);

            var gl = this.gl;
            gl.clear(gl.COLOR_BUFFER_BIT);

            g_points.map((point) => {
                gl.vertexAttrib3f(a_Position, point[0], point[1], 0.0);

                gl.drawArrays(gl.POINTS, 0, 1);
            });
        })
    },

    initShader: function() {
        var VSHADER_SOURCE = `
            attribute vec4 a_Position;
            attribute float a_PointSize;

            void main() {
                gl_Position = a_Position;
                gl_PointSize = a_PointSize;
            }
        `;

        var FSHADER_SOURCE = `
            precision mediump float;
            uniform vec4 u_FragColor;

            void main() {
                gl_FragColor = u_FragColor;
            }
        `;

        initShaders(this.gl, VSHADER_SOURCE, FSHADER_SOURCE);
    }

};

app.start();
