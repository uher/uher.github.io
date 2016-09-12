import os
import json

PATH_ROOT = 'musicmap/'

FILENAME_OUTPUT = "output.json"


# It will be called always...
def run():
	# sliceJsonItem()
	extractRaw()

def sliceJsonItem():
	startIndex = 5440
	endIndex = 5445
	with open(PATH_ROOT + 'track_data.json') as data_file:
		datas = json.load(data_file)
		datas = datas[startIndex:endIndex]

	with open(PATH_ROOT + 'track_data_s.json', 'w') as data_file:
		json.dump(datas, data_file)



def extractRaw():
	# with open(PATH_ROOT + 'track_data_s.json') as data_file:
	with open(PATH_ROOT + 'track_data.json') as data_file:
		input_datas = json.load(data_file)

	output_datas = []

	i = 0;
	for i_data in input_datas:
		
		print('index: ' + str(i))

		#set spotify track info
		o_data = {}
		o_data['name'] = i_data['name']
		o_data['preview_url'] = i_data['preview_url']
		o_data['artists'] = []

		if 'genres' in i_data:
			o_data['genres'] = i_data['genres']
		
		#set spotify artist info
		for artist in i_data['artists']:
			d = {}
			d['name'] = artist['name']
			d['href'] = artist['href']
			o_data['artists'].append(d)


		#set apple info
		if 'apple_info' in i_data and len(i_data['apple_info']) > 0 :
			o_data['apple_info'] = {}
			#if 'previewUrl' in i_data:

			if 'previewUrl' in i_data['apple_info']:
				o_data['apple_info']['previewUrl'] = i_data['apple_info']['previewUrl']
			
			#if 'primaryGenreName' in i_data:
			o_data['apple_info']['primaryGenreName'] = i_data['apple_info']['primaryGenreName']
		
		#set grace note info
		if 'gracenote_info' in i_data:
			o_data['gracenote_info'] = {}

			if 'mood' in i_data['gracenote_info']:
				o_data['gracenote_info'] = i_data['gracenote_info']['mood']
			
			o_data['gracenote_info'] = i_data['gracenote_info']['genre']
		
		output_datas.append(o_data)
		
		i = i + 1
		


	#save output file
	with open(PATH_ROOT + FILENAME_OUTPUT, 'w') as output_file:
		json.dump(output_datas, output_file)




# this is for the ' ' seperator file
def extractRawFile():
	root_path = 'musicmap/'
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


print('start.')
run()
print('end.')