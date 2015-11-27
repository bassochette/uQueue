#uQeue

## Routes

- Create queue
- push to queue
- pull from queue
- Get queue list
- get queue details ( remaining items, queue type (FiFo, LiFo, Random)

## Misc
- TTL on queue items

## Queue Definition :
```
{
	name : STRING,
	type : ["FiFo", "LiFo", "Random"],
	max-ttl : INTEGER,
	items : [
		{
			added: DATE,
			value : STRING
		}
	]
}
