marks = int(input("Enter Your marks :"))

# if(marks>=90):
#     print("Your grade is A+")
    
# elif(marks>=80):
#     print("Your grade is A")
    
# elif(marks>=70):
#     print("Your grade is B")
    
# elif(marks>=60):
#     print("Your grade is C")
    
# elif(marks>=50):
#     print("Your grade is D")
    
# else:
#     print("Your grade is F")

if(marks<=100 and marks>=90):
    grade ="A+"
    
elif(marks<90 and marks>=80):
    grade ="A"

elif(marks<80 and marks>=70):
    grade ="B"

elif(marks<70 and marks>=60):
    grade ="C"

elif(marks<60 and marks>=50):
    grade ="D"

elif(marks<50):
    grade ="F"

print("Your grade is ", grade)
