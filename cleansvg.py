# -*- coding: utf-8 -*-
"""
Created on Sat Apr  1 12:39:20 2017

@author: apple
"""

import os
import xml.etree.ElementTree

# Open original file

ROOT = "app/images/icons"

g_et = None
def fix(filepath):
    et = xml.etree.ElementTree.parse(filepath)
    root = et.getroot()
    #print help(root.getchildren)
    children = root.getchildren()
    found = False
    for child in root.getchildren():
        if "path" in child.tag:
            if child.attrib.get("fill", None) == '#000':
                print " found black path."
                children.remove(child)
                found = True
                break
    global g_et
    g_et = root
    if found:
        with open(filepath, "w") as outfile:
            et.write(outfile)
            print "wrote fixed!"
    else:
        print "no fix needed"

def run():
    for filename in os.listdir(ROOT):
        if "svg" in filename:
            print
            print filename
            fix(os.path.join(ROOT, filename))
        
                    
        #print els
        #print et
        #with open(filepath) as svgfile:
        #    svgdata = svgfile.read()
        #    print len(svgdata)
        #break

def listicons():
    names = []
    for filename in os.listdir(ROOT):
        if ".svg" in filename:
            names.append(filename[:-4])
            if "(1)" in filename:
                print filename
    print repr(names)

#run()
listicons()