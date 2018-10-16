MOCHA_TIMEOUT = 10000
BUNA_REPERTORY = git@10.0.248.200:Common/buna-js.git



all: prepare install start

prepare:
	rm -rf ./buna-js
	@git clone $(BUNA_REPERTORY)
	rm -rf ./buna-js/.babelrc ./buna-js/.gitignore \
		./buna-js/playground.js ./buna-js/package.json\
		./buna-js/dist

install:
	@npm install

test:
	@./node_modules/mocha/bin/mocha --timeout $(MOCHA_TIMEOUT)

start:
	@pm2 start ./bin/www --name smartContractOnline

restart:
	@pm2 restart smartContractOnline

clean: 
	rm -rf ./buna-js
	rm -rf ./node_modules
	pm2 stop smartContractOnline

.PHONY: test