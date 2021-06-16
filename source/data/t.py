import json

with open("source/data/terms.json", "r") as f:
    data = json.load(f)

s = [score for w, score in data.items()]

new_data = {}
for w, score in data.items():
    # new_data[w] = (score - min(s)) / (max(s) - min(s))
    if score > 1:
        score = 1
    elif score < -1:
        score = -1
    
    new_data[w] = score 

with open("terms.json", "w") as f:
    json.dump(new_data, f)
