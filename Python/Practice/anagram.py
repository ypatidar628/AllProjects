def anagram(str1,str2):
    str1 = str1.replace(" ","").lower()
    str2 = str2.replace(" ","").lower()
    return sorted(str1) == sorted(str2)
string1 = input("Enter First Sting :")
string2 = input("Enter second Sting :")

if anagram(string1,string2):
    print("Given strind is anagram!")
else:
    print("Given strind is not anagram!")