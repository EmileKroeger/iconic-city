# coding=utf-8
import json

import markov
import radix
import random

CITYFILE = "world-cities.json"

class CityData(object):
  def __init__(self):
    with open(CITYFILE, "rb") as cityfile:
      self.data = json.load(cityfile)
    self.by_country = {}
    for entry in self.data:
       country = entry["country"]
       city = entry["name"]
       self.by_country.setdefault(country, set()).add(city)

  def count(self, country):
      print(country, len(self.by_country[country]))

  def get(self, country):
      return self.by_country[country]

cd = CityData()
cd.count("France")
cd.count("Germany")

def gen(country, markov_n, count):
    mark = markov.Markov(markov_n)
    mark.add(cd.get(country))
    print()
    print(country)
    for i in range(count):
        print("-", mark.make())

def manygen():
    gen("France", 2, 10)
    gen("Germany", 2, 10)
    gen("Poland", 2, 10)
    gen("Japan", 2, 10)
    gen("Iran", 2, 10)
    gen("Spain", 2, 10)

def list_suffixes(names):
    trie = radix.SuffixTrie()
    for name in names:
        trie.insert(name)
    suffixes = list(trie.iterradix(5, 4))
    print("radixes:", len(suffixes))
    #for suffix, count in sorted(suffixes, key=lambda s_c: len(s_c[0]) * s_c[1]):
    for suffix, count in sorted(suffixes):
        print("-" + suffix, count)

def find_suffixes(country):
    list_suffixes(cd.get(country))

#find_suffixes("Germany")
#find_suffixes("United Kingdom") # has a few
# France has too many "sur marne"

GERMAN_SUFFIXES = [
    "burg", "berg", "heim", "stadt", "hausen", "dorf", "bach", "feld", "furt",
    "burg", "berg", "heim", "stadt", "hausen", "dorf", "bach", "feld", "furt",
    "hagen", "hof", "ingen",
    "kirch", "kirchen",
    "tal", "wald",
    u"brücken", u"brück", "stein", "rath", "weiler"]

def get_suffix(name, suffixes):
    for suffix in suffixes:
        if name.endswith(suffix):
            return suffix
    return None

def checkger():
    by_suffix = {}
    no_suffix = []
    for name in cd.get("Germany"):
        suffix = get_suffix(name, GERMAN_SUFFIXES)
        by_suffix.setdefault(suffix, 0)
        by_suffix[suffix] += 1
        if not suffix:
            no_suffix.append(name)
    for suffix, count in sorted(by_suffix.items(), key=lambda s_c:s_c[1]):
        print suffix, count
    list_suffixes(no_suffix)

#checkger()

def iter_pseudoger():
    for name in cd.get("Germany"):
        if (" " in name) or ("(" in name):
            continue
        suffix = get_suffix(name, GERMAN_SUFFIXES)
        if suffix:
            yield name[:-len(suffix)] + "~"
            yield name[:-len(suffix)] + "~"
        else:
            yield name

def check_pseudoger():
    names = list(iter_pseudoger())
    print(len(names))
    print(len(set(names)))

def pseudomarkovger():
    mark = markov.Markov(3)
    mark.add(list(iter_pseudoger()))
    print
    print "Pseudo markov germany"
    for i in range(10):
        word = mark.make()
        if word.endswith("~"):
            word = word.replace("~", random.choice(GERMAN_SUFFIXES))
        print "-", word

def printgtran():
    mark = markov.CMarkov(3)
    mark.add(list(iter_pseudoger()))
    jd = json.dumps(mark.tran)
    print len(jd)
    print jd.replace('"', "'")

#check_pseudoger()
#pseudomarkovger()
printgtran()