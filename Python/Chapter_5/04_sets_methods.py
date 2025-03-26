empty_set = set(); # Don't use s ={} as it will create an empty dictionary 
s = {1,2,3,3,3,"harry"} # this is set and set store only unique values and same value you can store in set but set print only one unique value 



#Properties of sets
# 1. Sets are unorderd ==> Elements order doesn't matter
# 2. Sets are unindexed ==> Cannot access element by index
# 3. There is no way to change items in sets
# 4. Sets cannot contain duplicate values


s.add(200)

print(s, type(s) )

s.remove(2) # s is now {1, 3}
print(s, type(s) )

s.discard(2) # s is now {1, 3}
print(s, type(s) )

# element = s.pop(3) # element is 1 (or 2 or 3, as sets are unordered)
# print(s, type(s) )

s.clear() # s is now set()
print(s, type(s) )

s1 = {1, 2, 3}
s2 = {3, 4, 5}
s3 = s1.union(s2) # s3 is {1, 2, 3, 4, 5}
print("union",s3, type(s3) )

   
s1 = {1, 2, 3}
s2 = {2, 3, 4}
s3 = s1.intersection(s2) # s3 is {2, 3}
print("intersection",s3, type(s3) )

s1 = {1, 2, 3}
s2 = {2, 3, 4}
s3 = s1.difference(s2) # s3 is {1}
print("difference",s3, type(s3) )

s1 = {1, 2, 3}
s2 = {2, 3, 4}
s3 = s1.symmetric_difference(s2) # s3 is {1, 4}
print("symmetric_difference :",s3, type(s3) )

s1 = {1, 2}
s2 = {1, 2, 3}
result = s1.issubset(s2) # result is True
print("Result :",result, type(result) )


