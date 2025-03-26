a = (1,2,34,556,34,False,"Yogendra","Harry")

print(type(a))

b = () 
print(type(b)) # create blank  tuple

c = (2,)
print(type(c)) #if your stored data is only one value when type in not tuple but store 2, when type is tuple

count = a.count(34) # count how much quantity stroe in your tuples 
print(count)

index = a.index(34) #sabse pehle jis index pe value hogi vo index show karega

print(index)

repeat = a*3  # Repeat tuple

print(repeat)

print("Yogendra" in a) # check data exist or not in tuple => outpu is true(boolean)

print(a+b+c) # conatination of tuples


print(len(a)) # give length of tuples 

d = list(a)#convert tuple into list
print(d)
print(type(d))

e = tuple(d)#convert list into tuple
print(e)
print(type(e))

j =1    
