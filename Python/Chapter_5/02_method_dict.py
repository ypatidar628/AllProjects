d = {} # this  is a empty dictionary
marks = {
    "yogendra":97,
    "Saksham":77,
    "Sarthak":87,
    "Num":[1,5,3],
    1 :"Yogendra"
}

print(marks.items())
print(marks.keys())
# marks.update({"yogendra":100,"atishay":97}) # if key is availabe in marks then update but key isn't available the add new key and data
# print(marks)

print(marks.get("yogendra"))

# print(marks.get("yogendra2")) #Prints none
# print(marks["yogendra2"]) #Returns an errormarks = {
