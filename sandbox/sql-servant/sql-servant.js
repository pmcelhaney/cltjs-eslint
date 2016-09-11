
	var each = function(obj, iterator, context) {
	    if (obj == null) return;
		    for (var i = 0, length = obj.length; i < length; i++) {
	    	iterator.call(context, obj[i], i, obj);
	  	}
	};

	var map = function(obj, iterator, context) {
	    var results = [];
	    if (obj == null) return results;
	    each(obj, function(value, index, list) {
	      results.push(iterator.call(context, value, index, list));
	    });
	    return results;
  	};


	var SqlServant = function () {
		var tableName = "SOME_TABLE";
		var keyColumnNames = [];
		var keyColumnValues = [];
		var columnNames = [];
		var columnValues = [];
		var optionalColumnNames = [];
		var optionalColumnValues = [];

		var trim = function (s) {
			return s.replace(/^\s+|\s+$/g, '');
		};


		var listOfPairs = function (keys, values, pairDelimiter, delimiter) {
			var lines = [];
			for (var i = 0; i < keys.length; i++) {
				lines.push(keys[i] + pairDelimiter + values[i]);
			}
			return lines.join(delimiter || '');
		};

		var equalsPairList = function (keys, values, delimiter) {
			return listOfPairs(keys, values, ' = ', delimiter);
		}

		var allColumnNames = function () {
			return keyColumnNames.concat(columnNames, optionalColumnNames);
		};

		var allColumnValues = function () {
			return keyColumnValues.concat(columnValues, optionalColumnValues);
		};

		var prefixAll = function (obj, prefix) {
			return map(obj, function (item) {
				return prefix + item;
			})
		}

		var addTerminator = function (s) {
			return s + ';';
		}

		return {
			setTableName: function (t) {
				tableName = t;
			},
			addKeyColumn: function (k, v) {
				keyColumnNames.push(trim(k));
				keyColumnValues.push(trim(v));
			},
			addColumn: function (k, v) {
				columnNames.push(trim(k));
				columnValues.push(trim(v));
			},

			addOptionalColumn: function (k, v) {
				optionalColumnNames.push(trim(k));
				optionalColumnValues.push(trim(v));
			},

			updateStatement: function () {
				var lines = [];
				if (!columnNames.length) return '/* nothing to update */';
				lines.push('UPDATE ' + tableName);
				lines.push('SET');
				lines.push(equalsPairList(columnNames, columnValues, ',\n'));
				lines.push('WHERE');
				lines.push(equalsPairList(keyColumnNames, keyColumnValues, ' AND\n'));
				return addTerminator(lines.join('\n'));
			},

			deleteStatement: function () {
				var lines = [];
				lines.push('DELETE FROM ' + tableName);
				lines.push('WHERE');
				lines.push(equalsPairList(keyColumnNames, keyColumnValues, ' AND\n'));
				return addTerminator(lines.join('\n'));
			},

			insertStatement: function () {
				return addTerminator('INSERT INTO ' + tableName + '(' + allColumnNames().join(', ') + ')\nVALUES (' + allColumnValues().join(', ')+ ')');
			},
			mergeStatement: function () {
				var lines = [];
				lines.push('MERGE INTO ' + tableName + ' A USING');
				lines.push('(SELECT ');
				lines.push(listOfPairs(allColumnValues(), allColumnNames(), ' AS ' , ',\n'));
				lines.push('FROM DUAL) B');
				lines.push('ON (' + listOfPairs(prefixAll(keyColumnNames, 'A.'), prefixAll(keyColumnNames, 'B.'), ' = ', ' AND ') + ')');

				lines.push('WHEN NOT MATCHED THEN');
				lines.push('INSERT (' + allColumnNames().join(', ') + ')');
				lines.push('VALUES (' + prefixAll(allColumnNames(), 'B.').join(', ') + ')');

				if(columnNames.length) {
					lines.push('WHEN MATCHED THEN');
					lines.push('UPDATE SET');
					lines.push(equalsPairList(prefixAll(columnNames, 'A.'), prefixAll(columnNames, 'B.'), ',\n'));
				}
				return addTerminator(lines.join('\n'));
			}


		}

	};


	var parse = function () {
		var s = SqlServant();
		var input = document.getElementById('input').value;
		var inputLines = input.split('\n');
		var tableName = inputLines[0];
		s.setTableName(tableName);
		var method = 'addKeyColumn'
		for (var i = 1; i < inputLines.length; i++) {
			if (inputLines[i].substring(0,1) === '-') {
				method = (method === 'addKeyColumn') ? 'addColumn' : 'addOptionalColumn';
			}
			var pair = inputLines[i].split('=');
			if (pair[0] && pair[1]) {
				s[method](pair[0], pair[1]);
			}

		}
		document.getElementById('update-code').value = s.updateStatement();
		document.getElementById('insert-code').value = s.insertStatement();
		document.getElementById('merge-code').value = s.mergeStatement();
		document.getElementById('delete-code').value = s.deleteStatement();
	}


	if(!document.addEventListener) {
		alert('Sorry, this browser\'s not supported. Use a modern browser (IE9+, Firefox, Chrome).')
	}

	document.getElementById('input').addEventListener('keyup', parse);
	parse();
