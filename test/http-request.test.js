const expect = require('chai').expect;
const httpRequest = require('../lib/http-request');
const nock = require('nock');

describe('httpRequest', function() {
    beforeEach(function() {
        process.env.NODE_ENV = 'test';
        nock.cleanAll();
    });

    afterEach(function() {
        nock.cleanAll();
        delete process.env.NODE_ENV;
    });

    describe('getRaw', function() {
        it('should return a Buffer', async function() {
            nock('http://example.com')
                .get('/test.txt')
                .reply(200, 'Hello, World!');

            const result = await httpRequest.getRaw('http://example.com/test.txt');
            expect(result).to.be.an.instanceOf(Buffer);
            expect(result.toString()).to.equal('Hello, World!');
        });

        it('should handle HTTP errors', async function() {
            nock('http://example.com')
                .get('/error')
                .reply(404, 'Not Found');

            try {
                await httpRequest.getRaw('http://example.com/error');
                throw new Error('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.include('HttpStatus404');
                expect(error.statusCode).to.equal(404);
            }
        });
    });

    describe('getBlob', function() {
        it('should return a Blob', async function() {
            const fakeResponse = Buffer.from([1, 2, 3, 4, 5]);
            nock('http://example.com')
                .get('/test.bin')
                .reply(200, fakeResponse, { 'Content-Type': 'application/octet-stream' });

            const result = await httpRequest.getBlob('http://example.com/test.bin');
            expect(result).to.be.an.instanceOf(Blob);
            expect(result.size).to.equal(5);
            expect(result.type).to.equal('application/octet-stream');
        });
    });

    describe('getText', function() {
        it('should return a string', async function() {
            nock('http://example.com')
                .get('/test.txt')
                .reply(200, 'Hello, World!', { 'Content-Type': 'text/plain' });

            const result = await httpRequest.getText('http://example.com/test.txt');
            expect(result).to.be.a('string');
            expect(result).to.equal('Hello, World!');
        });
    });

    describe('getJson', function() {
        it('should return a parsed JSON object', async function() {
            const fakeResponse = { message: 'Hello, World!' };
            nock('http://example.com')
                .get('/test.json')
                .reply(200, fakeResponse, { 'Content-Type': 'application/json' });

            const result = await httpRequest.getJson('http://example.com/test.json');
            expect(result).to.be.an('object');
            expect(result.message).to.equal('Hello, World!');
        });

        it('should handle invalid JSON', async function() {
            nock('http://example.com')
                .get('/invalid.json')
                .reply(200, 'Invalid JSON', { 'Content-Type': 'application/json' });

            try {
                await httpRequest.getJson('http://example.com/invalid.json');
                throw new Error('Should have thrown an error');
            } catch (error) {
                expect(error.message).to.include('NotAValidJson');
            }
        });
    });

    describe('request', function() {
        it('should send custom requests', async function() {
            nock('http://example.com')
                .post('/custom')
                .reply(200, 'Custom request', { 'Content-Type': 'text/plain' });

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: 'value' })
            };

            const result = await httpRequest.request('http://example.com/custom', options);
            expect(result).to.be.an.instanceOf(Buffer);
            expect(result.toString()).to.equal('Custom request');
        });
    });

    // 代理方法的测试
    describe('requestProxy', function() {
        it('should send requests through proxy', async function() {
            nock('http://localhost')
                .post('/proxy')
                .reply(200, 'Proxied response');

            const options = {
                method: 'GET',
                headers: { 'X-Custom-Header': 'value' },
                allowedMimes: ['text/plain', 'application/json']
            };

            const result = await httpRequest.requestProxy('http://example.com/proxied', options);
            expect(result).to.be.an.instanceOf(Buffer);
            expect(result.toString()).to.equal('Proxied response');
        });
    });
});