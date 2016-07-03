

```
> db.blog.update({"post" : post_id},
... {"$inc" : {"comments.0.likes" : 1}})
```


```
> db.users.find({"age" : {"$lt" : 30, "$gt" : 20}})
> db.products.find({"price" : {"$lt" : 30, "$gt" : 20}})
```

```
> db.food.insert({"_id" : 1, "fruit" : ["apple", "banana", "peach"]})
> db.food.insert({"_id" : 2, "fruit" : ["apple", "kumquat", "orange"]}) 
> db.food.insert({"_id" : 3, "fruit" : ["cherry", "banana", "apple"]})
```

```
> db.food.find({fruit : {$all : ["apple", "banana"]}}) {"_id" : 1, "fruit" : ["apple", "banana", "peach"]} {"_id" : 3, "fruit" : ["cherry", "banana", "apple"]}
```

```
db.food.find({ fruit: { $in: [ 'apple', 'banana', 'cherry', 'peach', 'cucumber' ] }})
```

```
db.food.find({ $not : { 
    fruit: { $in: [ 'apple', 'banana', 'cherry', 'peach', 'cucumber' ] 
    }})
```

```
db.food.find({ $or: [
    { fruit: 'apple' }, 
    {fruit:'banana'} 
    {price:10} ,
    {_id: 1}
  ]
})
```

```
> db.products.find({"$where" : "this.price + this.shipping < 100"})
```

```
> db.foo.find({"$where" : "this.x + this.y == 10"})
> db.foo.find({"$where" : "function() { return this.x + this.y == 10; }"})
```