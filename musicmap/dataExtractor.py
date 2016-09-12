import os
import json

PATH_ROOT = 'musicmap/'


FILENAME_TRACK_RAW = 'track_data.json'
FILENAME_TRACK_SUMMARY = "track_summary.json"
FILENAME_TRACK_SUMMARY_SLICE = "track_summary_s.json"

FILENAME_LEARNING_RAW = "learning_raw.txt"
FILENAME_LEARNING = "leanring.txt"

FILENAME_MAP_DATA = "map.json"

#. 1. extract small music info from track_data.txt


# It will be called always...
def run():

	# - learnig data part
	# extracted learning data
	# extractRawFile(FILENAME_LEARNING_RAW, FILENAME_LEARNING)

	# - track data part
	# extractTrackRaw(FILENAME_TRACK_RAW, FILENAME_TRACK_SUMMARY)
	# sliceJsonItem(FILENAME_TRACK_SUMMARY, FILENAME_TRACK_SUMMARY_SLICE)

	# - merge
	mergeMusicinfoAndLearninginfo(FILENAME_TRACK_SUMMARY, FILENAME_LEARNING, FILENAME_MAP_DATA)

def mergeMusicinfoAndLearninginfo(filename_track, filename_learnig, filename_output):
	print("merge start")

	with open(PATH_ROOT + filename_track) as f_track:
		data_track = json.load(f_track)
	
	with open(PATH_ROOT + filename_learnig) as f_leanring:
		data_leanring = json.load(f_leanring)

	print('len : ' + str(len(data_track)))
	print("merge end")

	# x, y, id	
	dic_id =  {}

	for item in data_leanring:
		dic_id[item['id']] = item
	
	for item in data_track:
		item['x'] = dic_id[item['id']]['x']
		item['y'] = dic_id[item['id']]['y']

	with open(PATH_ROOT + filename_output, 'w') as f_output:
		json.dump(data_track, f_output)


def sliceJsonItem(filename_i, filename_o, num_item = 10, startIndex = 0):
	
	endIndex = startIndex + num_item
	with open(PATH_ROOT + filename_i) as data_file:
		datas = json.load(data_file)
		datas = datas[startIndex:endIndex]

	with open(PATH_ROOT + filename_o, 'w') as data_file:
		json.dump(datas, data_file)

	print(str(num_item) + "th Items created in " + filename_o)


def extractTrackRaw(filename_raw, filename_summary):
	# with open(PATH_ROOT + 'track_data_s.json') as data_file:
	with open(PATH_ROOT + filename_raw) as data_file:
		input_datas = json.load(data_file)

	output_datas = []

	i = 0;
	for i_data in input_datas:
		
		print('index: ' + str(i))

		#set spotify track info
		o_data = {}
		o_data['id'] = i_data['id']
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
	with open(PATH_ROOT + FILENAME_TRACK_SUMMARY, 'w') as output_file:
		json.dump(output_datas, output_file)




# this is for the ' ' seperator file
def extractRawFile(filename_learning_raw, file_learning_output):
	root_path = 'musicmap/'
	f_raw = open(root_path + filename_learning_raw)

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

	with open(root_path + file_learning_output, 'w') as outfile:
		json.dump(full_data, outfile)


print('start.')
run()
print('end.')