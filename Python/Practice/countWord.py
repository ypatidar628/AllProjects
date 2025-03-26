sentence = "this is a pen. this is a pencil."
word_to_count = "this"

words=[]
current_word=""

for char in sentence :
    if char not in " .":
        current_word += char
    else:
        if current_word:
            words.append(current_word)
            current_word = ""

if current_word:
    words.append(current_word)

count = 0
for word in words :
     if word == word_to_count:
         count +=1
        
print(f"The word '{word_to_count}' is {count} in the sentence.")