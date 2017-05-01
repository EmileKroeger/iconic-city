import collections

class Trie:
    def insert(self, string):
        node = self
        for char in string[::self.order]:
            node = node.children[char]
            node.count += 1
        node = node.children['$']
        node.count += 1

    def __contains__(self, word):
        trie = self
        for char in word:
            if char in trie.children:
                trie = trie.children[char]
            else:
                return False
        return True
    
    def tostring(self, depth=0):
        s = []
        for key, child in self.children.items():
            s.append( '{}{} {} {}'.format(
                ' ' * depth, key, child.count, '\n' + child.tostring(depth + 1)))
        return ''.join(s)
    
    def iterradix(self, min_count, min_length):
        for char, child in self.children.items():
            if child.count > min_count:
                for subradix, count in child.iterradix(min_count, min_length - 1):
                    if self.order == -1:
                        radix = subradix + char
                    else:
                        radix = char + subradix
                    yield radix, count
        if min_length <= 0:
            yield "", sum(child.count for child in self.children.values())

class SuffixTrie(Trie):
    order=-1
    def __init__(self):
        self.children = collections.defaultdict(SuffixTrie)
        self.count = 0

class PrefixTrie(Trie):
    order=1
    def __init__(self):
        self.children = collections.defaultdict(PrefixTrie)
        self.count = 0


print("test?")
if __name__ == '__main__':
    #doctest.testmod()
    trie = Trie(-1)
    for word in ('banning', 'banned', 'banana', 'bad', 'cooking', 'cought', 'count'):
        trie.insert(word)
    print("built trie.")
    print(trie.tostring())