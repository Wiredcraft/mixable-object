ENV = NODE_ENV=test DEBUG=carcass:*
MOCHA = ./node_modules/.bin/_mocha
MOCHA_OPTS = -b --reporter spec
TESTS = test/*.mocha.js
ISTANBUL = ./node_modules/.bin/istanbul
COVERALLS = ./node_modules/.bin/coveralls

lint:
	@echo "Linting..."
	@./node_modules/.bin/jscs index.js benchmark lib test
test: lint
	@echo "Testing..."
	@$(ENV) $(MOCHA) $(MOCHA_OPTS) $(TESTS)
test-cov: lint
	@echo "Testing..."
	@$(ENV) $(ISTANBUL) cover $(MOCHA) -- $(MOCHA_OPTS) $(TESTS)
test-coveralls: test-cov
	@cat ./coverage/lcov.info | $(COVERALLS) --verbose
benchmark: lint
	@echo "Benchmarking..."
	@$(ENV) $(MOCHA) $(MOCHA_OPTS) --timeout 120000 benchmark/*.js
.PHONY: lint test test-cov test-coveralls benchmark
