a = int(input("Enter Your Age : "))

# if  statement 1
if(a%2==0):
    print(a,": is Even Number...")
else:
    print(a,": is Odd Number...")
#End of  if statement 1

# if statement 2
if(a>=18):
    print("You are elegible for voating...")
    print("Thank You!")
    

elif(a< 0): 
    print("Please enter valid age , age should be positive number...")

elif(a==0):
    print("You are entering 0 which is not a valid age...")

else:
    print("You are Not elegible for voating...")

#End of if statement 2

print("End of Program...")

