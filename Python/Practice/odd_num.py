number = [1,2,4,5,8,12,16]
odd_num = []

#using logic
for num in number:
    if num % 2 !=0:
        odd_num.append(num)
print(odd_num)

#Using second way

oddNum = [num for num in number if num % 2!=0]

print(oddNum)