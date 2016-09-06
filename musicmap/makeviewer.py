import os
import json

root_path = 'musicviewer/'
f_raw = open(root_path + 'data.txt')

raw_col = ['id', 'x', 'y']

lines = f_raw.readlines()

full_data = []

## wrap

j = 0
b = 'ddd'
for line in lines:
	
	line = line.replace('\n', '')
	in_element = line.split(' ')
	out_element = {}
	
	# print('index: ' + str(j) + ', ' + line)
	for i in range(len(raw_col)):
		out_element[raw_col[i]] = in_element[i]
	
	full_data.append(out_element)
	j = j + 1

print('completed parsing')

with open(root_path + 'output.txt', 'w') as outfile:
    json.dump(full_data, outfile)