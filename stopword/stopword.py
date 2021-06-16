import json, sys, fileinput
from nltk.corpus import stopwords

stopword = stopwords.words('english')
stopword = set(map(str.strip, fileinput.input('stopword.txt')))
data = json.load(sys.stdin)
json.dump({i: data[i] for i in data if i not in stopword}, sys.stdout)
