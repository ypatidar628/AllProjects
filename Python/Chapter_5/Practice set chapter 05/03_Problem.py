s = set()

s.add(18)
s.add("18")

print(s)

ns=set()

ns.add(20)
ns.add(20.0)
ns.add("20")
print(ns) # output : 20,"20"