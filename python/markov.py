# -*- coding: utf-8 -*-
"""
Created on Sat Apr 22 23:34:38 2017

@author: Emile Kroeger
"""

import random

def weighted_draw(dic):
    total = sum(dic.values())
    index = random.randint(0, total-1)
    for key, count in dic.items():
        index -= count
        if index < 0:
            return key

class Markov(object):
    def __init__(self, n):
        self.n = n
        self.tran = {}
        
    def add(self, words):
        for word in words:
            seq = "^%s$" % word
            #(seq)
            for i in range(1, len(seq)):
                out = seq[i]
                prev = seq[max(0, i-self.n):i]
                #print(repr((i, prev, out)))
                d = self.tran.setdefault(prev, {})        
                d.setdefault(out, 0)
                d[out] += 1
    
    def make(self):
        chain = "^"
        for i in range(100):
            prev = chain[-self.n:]
            possible = self.tran[prev]
            new = weighted_draw(possible)
            #print(chain, prev, new)
            if new == "$":
                return chain[1:]
            else:
                chain += new

class CMarkov(object):
    "Compact markov"
    def __init__(self, n):
        self.n = n
        self.tran = {}
        
    def add(self, words):
        for word in words:
            seq = "^%s$" % word
            #(seq)
            for i in range(1, len(seq)):
                out = seq[i]
                prev = seq[max(0, i-self.n):i]
                #print(repr((i, prev, out)))
                self.tran.setdefault(prev, "")        
                self.tran[prev] += out
    
    def make(self):
        chain = "^"
        for i in range(100):
            prev = chain[-self.n:]
            possible = self.tran[prev]
            new = random.choice(possible)
            #print(chain, prev, new)
            if new == "$":
                return chain[1:]
            else:
                chain += new

def test():
    words = ["toto", "tutu", "troutrou", "blibli", "bubou", "machine"]
    mark1 = CMarkov(2)
    mark1.add(words)
    import pprint
    pprint.pprint(mark1.tran)
    print mark1.make()

if __name__ == "__main__":
    test()