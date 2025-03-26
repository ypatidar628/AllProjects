# ... existing list definition and basic operations ...
friends = ["John", "Jane", "Jim", "Jill" ,5,5.5,False,"Hello","Python"]     #list is a collection of items 

print(friends)

# Common list methods
friends.append("Bob")  # Adds element at the end
print(friends)

friends.insert(5, "Mary")  # Inserts element at specified index
print(friends)

friends.remove("Jim")  # Removes first occurrence of element
print(friends)

popped_friend = friends.pop()  # Removes and returns last element
print(friends)
print(popped_friend)

# friends.sort()  # Sorts list in-place (only works with homogeneous data)
# print(friends)

friends.reverse()  # Reverses list in-place
print("reverse",friends)

friends.clear()  # Removes all elements
print(friends)


# // ... existing code ...

# Example of sort method with homogeneous data
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
print("Original numbers:", numbers)
numbers.sort()  # Sorts in ascending order
print("Sorted numbers:", numbers)

numbers.sort(reverse=True)  # Sorts in descending order
print("Reverse sorted numbers:", numbers)

# Example with strings
names = ["Zack", "Alice", "Bob", "Charlie"]
print("\nOriginal names:", names)

names.sort()
print("Sorted names:", names)

names.sort(reverse=True)  # Sorts in descending order
print("Reverse sorted names:", names)