module.exports = [
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
            globals: {
                // 这里定义全局变量
                window: 'readonly',
                document: 'readonly',
                // 添加 Mocha 全局变量
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
            },
        },
        rules: {
            // 这里可以添加或覆盖规则
        },
    },
];