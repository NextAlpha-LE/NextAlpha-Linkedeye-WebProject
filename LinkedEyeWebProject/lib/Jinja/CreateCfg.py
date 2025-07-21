import sys
from jinja2 import Template

class CreateCFG:
	def __init__(self, file_name, file_content, cfg_file_name, template_loc, cfg_loc):
		self.file_name = file_name
		self.file_content = file_content
		self.cfg_file_name = cfg_file_name
		self.template_loc = template_loc
		self.cfg_loc = cfg_loc

	def createCFGFile(self):
		self.temp_file_content = "{" + self.file_content + "}"
		self.temp_file_content_dic = eval(str(self.temp_file_content))
		Template(open(self.template_loc).read()).stream(self.temp_file_content_dic).dump(self.cfg_loc+str(self.cfg_file_name))
		return "Success"
		
