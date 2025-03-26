number = [34,56,5,5,7,4,266,533]

#Using logic

largest = number[0]

for num in number:
    if num > largest:
        largest = num

print(f"Largest Number is : {largest}")

#using Pre-define method
print(f"Largest Number is : {max(number)}")

#usinf sort method
number.sort()
# res = number[-1]
print(number[-1])
