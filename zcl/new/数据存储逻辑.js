
// 数据存储逻辑
范围        Min                     Max
            active-cache-recycle-unused
初始值 [-]  0    0 0 0 0 ...  0    0 
数量   0    1    2 3 4 5 ...  2047 2048
索引   -1   0    1 2 3 4 ...  2046 2047

初值    0 | null | false
总数    total    Min <= total <= Max   =  used + unused    =  occupied + unoccupied

occupied    占用的    = active + cache
unoccupied  空闲的    = recycle + unused

类别
unused      未使用的  = Max - used
used        使用过的  = active + cache + recycle
active      活跃
cache       缓存      = 1级缓存  限制数量 LIMIT >> 0x100 - 256
recycle     回收

游标 Vernier 总是标记对应类别中最大索引值
游标值 = INVALID + VALID
INVALID = -1
VALID   = Min <= Vernier < Max

UsedVernier         >> 游标使用过的
ActiveVernier       >> 游标活跃的
CacheVernier        >> 游标缓存的
RecycleVernier      >> 游标回收的


使用方法
设置 array - MAX_SIZE
设置 Cache - CACHE_SIZE

init >> set
  ActiveVernier = -1
  CacheVernier = -1
  RecycleVernier = -1
  UsedVernier = -1

allocate >> 


deallocate >> 






