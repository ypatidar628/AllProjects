friends = ["John", "Jane", "Jim", "Jill" ,5,5.5,False,"Hello","Python"]     #list is a collection of items 

print(friends) #print the list  => output: ['John', 'Jane', 'Jim', 'Jill', 5, 5.5, False, 'Hello', 'Python']

friends[0] = "Johny" #Unlike strings lists are mutable  => output: ['Johny', 'Jane', 'Jim', 'Jill', 5, 5.5, False, 'Hello', 'Python']

print(friends)  #print the list  => output: ['Johny', 'Jane', 'Jim', 'Jill', 5, 5.5, False, 'Hello', 'Python']

print(len(friends)) #length of the list => output: 9

print(type(friends))  #type of the list => output: <class 'list'>

print(friends[0:3]) #print the first three elements of the list => output: ['Johny', 'Jane', 'Jim']

print(friends[-1]) #print the last element of the list => output: Python    

print(friends[::-1]) #print the list in reverse order


