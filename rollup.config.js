import rollupTypescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble'

export default {
    input: 'lib/cookie.ts',
    output: {
        file: 'dist/cookie.js',
        format: 'umd'
    },
    plugins: [
        rollupTypescript(),
        resolve(),
        babel({
            babelrc: false,
            presets: [['env', { modules: false }]],
            exclude: 'node_modules/**' // 只编译我们的源代码
        }),
        buble()
    ]
};