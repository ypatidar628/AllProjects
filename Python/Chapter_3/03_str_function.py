name  = "Yogendra"

print(len(name))
print(name.endswith("dra"))
print(name.startswith("Yog"))


###############################################################################

# 1. length() / len()
# Description: Returns the length of the string (number of characters).
# Example:
# python
# Copy code


print(len("Hello") )
 # 5


# 2. substring() / slice()
# Description: Extracts a part of the string (from a start index to an end index).
# Example:
# python
# Copy code

print("Hello"[1:4]) 
 # "ell"




# 3. indexOf() / find()
# Description: Finds the index of the first occurrence of a substring.
# Example:
# python
# Copy code


print("Hello".index('e')) 
 # 1


# 4. replace()
# Description: Replaces a specified substring with another string.
# Example:
# python
# Copy code


print("Hello World".replace("World", "Python"))  
# "Hello Python"


# 5. toUpperCase() / upper()
# Description: Converts all characters in the string to uppercase.
# Example:
# python
# Copy code


print("hello".upper() )
 # "HELLO"

# 6. toLowerCase() / lower()
# Description: Converts all characters in the string to lowercase.
# Example:
# python
# Copy code


print("HELLO".lower()  )
# "hello"


# 7. trim() / strip()
# Description: Removes whitespace from both ends of the string.
# Example:
# python
# Copy code


print("  Hello  ".strip() )
 # "Hello"


# 8. split()
# Description: Splits a string into an array (list) based on a delimiter.
# Example:
# python
# Copy code


print("apple,banana,orange".split(',') )
 # ["apple", "banana", "orange"]


# 9. join()
# Description: Joins a list of strings into a single string with a separator.
# Example:
# python
# Copy code


print("-".join(["apple", "banana", "orange"]) )
 # "apple-banana-orange"


# 10. startsWith() / startswith()
# Description: Checks if the string starts with the specified substring.
# Example:
# python
# Copy code


print("Hello".startswith("He")  )
# True


# 11. endsWith() / endswith()
# Description: Checks if the string ends with the specified substring.
# Example:
# python
# Copy code


print("Hello".endswith("lo")  )
# True


# 12. contains() / in
# Description: Checks if the string contains a certain substring.
# Example:
# python
# Copy code


print("Hello" in "Hello World")
  # True


# 13. repeat()
# Description: Repeats the string a specified number of times.
# Example:
# python
# Copy code


# print("Hello".repeat(3) )
 # "HelloHelloHello"


# 14. replaceAll()
# Description: Replaces all occurrences of a substring in the string.
# Example:
# python
# Copy code


print("Hello Hello".replace("Hello", "Hi") )
 # "Hi Hi"


# 15. charAt() / []
# Description: Returns the character at a specific index.
# Example:
# python
# Copy code


print("Hello"[1] )
 # "e"


# 16. isEmpty()
# Description: Checks if the string is empty.
# Example:
# python
# Copy code


# print("".isEmpty() )
 # True


# 17. padStart()
# Description: Pads the string from the start with a specific character until it reaches the desired length.
# Example:
# python
# Copy code


# print("5".padStart(3, '0') )
 # "005"


# 18. padEnd()
# Description: Pads the string from the end with a specific character until it reaches the desired length.
# Example:
# python
# Copy code


# print("5".padEnd(3, '0')  )
# "500"


# These functions are frequently used in ma