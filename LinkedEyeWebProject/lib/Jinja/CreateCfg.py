"""
Jinja2 config file generator.
FIXED: eval() replaced with json.loads() to prevent arbitrary code execution.
FIXED: Proper file handle management with context managers.
"""

import json
from jinja2 import Template


class CreateCFG:
    def __init__(self, file_name, file_content, cfg_file_name, template_loc, cfg_loc):
        self.file_name = file_name
        self.file_content = file_content
        self.cfg_file_name = cfg_file_name
        self.template_loc = template_loc
        self.cfg_loc = cfg_loc

    def createCFGFile(self):
        # FIXED: json.loads instead of eval() to prevent code execution
        self.temp_file_content = "{" + self.file_content + "}"
        self.temp_file_content_dic = json.loads(self.temp_file_content)
        with open(self.template_loc) as f:
            template = Template(f.read())
        template.stream(self.temp_file_content_dic).dump(self.cfg_loc + str(self.cfg_file_name))
        return "Success"
