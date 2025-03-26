py = int(input("Enter Physics number: "))
che = int(input("Enter Chemistery number: "))
math = int(input("Enter Math number: "))

# check total marks
total_marks=py+che+math;
print("Total marks:",total_marks)

# check for total percentage...

total_percentage =(total_marks/300)*100;

print("Percentage:",total_percentage)

if(total_percentage>=40 and py>=33 and che>=33 and math>=33):
    print("You are Pass...")
else:
    print("You failed...")