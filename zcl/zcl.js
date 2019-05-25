惯例

命名
{v.0.1 2018-5-11 15:18:15
在同一个库、域、结构中，方法、变量、常量、参数等不能一样，同名的话含义会被里面的重写

范畴              命名方式
库名              zcl + 单词[首字母大写]   >> zclPoint or zclDebug ..
public结构名      全部弃用 >> 普通结构名 
普通结构名        库名 + s 或者 zclNameds >> zcl + 首字母大写[Named] + s    >>   zclPoints or zclDebugs
private结构名     首字母大写 + s >> Points or Debugs
public全局常量    全部弃用 >> 普通全局常量          
普通全局常量      库名 + 下划线 + 首字母大写的常量名 libraryName_VariableName
private全局常量   常量名全部大写 + 下划线  SPEED  or  INVALID or TIMER_RECYCLE_LIMIT
private全局变量   首字母大写   Timers  or Dialogs or TimerVernierCache
operator方法      使用英语单词
参数              字母a + operator名
成员              M + operator名
static成员        S + operator名(除首个单词以外其余单词首字母大写)
local             类型首字母+p+自定义名

}


常用方法名
固定 - 固定编码含义
冲突 - 编译器内定
{
构造器             create            固定-冲突     见 构造
                   ttps              固定          见 构造
解析器             destroy           固定-冲突     见 解析
                   onDestroy         固定-冲突
initializer        init              固定          见 初始化
                   Ready             固定
bonf               isOn              固定          见 ED
                   isOff             固定
                   off               固定
                   on                固定
执行入口           run               固定          见
                   runnable          固定          见
}



Enable Disable ED  - 范例
Define Set Get DSG - 范例
One Line       OL  - 范例
IS[STATUS]     IS  - 范例
operator       OP  - 范例
{
METHOD >> 方法名
ARG    >> 参数
TYPE   >> 数据类型
VALUE  >> 初值和赋值
Member >> 成员
FLAG   >> true false
API    >> native函数
EXP    >> expression 表达式

/** ED */
{
private boolean this.bonf = false
//! textmacro TM_结构名_ED takes METHOD, IS, VALUE
  method $METHOD$ takes nothing returns nothing
    if $IS$ then
      set this.bonf = $VALUE$
    endif
  endmethod
//! endtextmacro

//! runtextmacro TM_结构名_ED("on", "not this.bonf", "true")
//! runtextmacro TM_结构名_ED("off", "this.bonf", "false")
}
/** DSG */
{
//! textmacro TM_结构名_DSG takes METHOD, TYPE, VALUE, MEMBER
  private $TYPE$ $MEMBER$ = $VALUE$             
  method operator $METHOD$ takes nothing returns $TYPE$
    return this.$MEMBER$
  endmethod
  method operator $METHOD$= takes $TYPE$ a$MEMBER$ returns nothing
    set this.$MEMBER$ = a$MEMBER$
  endmethod
//! endtextmacro
//! runtextmacro TM_结构名_DSG("prev", "integer", "INVALID", "Mprev")
//! runtextmacro TM_结构名_DSG("next", "integer", "INVALID", "Mnext")
//! runtextmacro TM_结构名_DSG("index", "integer", "INVALID", "Mindex")
}
/** IS */
{
//! textmacro TM_结构名_IS takes METHOD, EXP
  method is$METHOD$ takes nothing returns boolean
    return $EXP$
  endmethod 
//! endtextmacro

//! runtextmacro TM_结构名_IS("On", "IsTriggerEnabled(this.ttriger)")
//! runtextmacro TM_结构名_IS("Off", "not IsTriggerEnabled(this.ttriger)")
//! runtextmacro TM_结构名_IS("Reset", "this.istatus == RESET")
//! runtextmacro TM_结构名_IS("Sleep", "IsTriggerWaitOnSleeps(this.ttriger)")
//! runtextmacro TM_结构名_IS("Waken", "not IsTriggerWaitOnSleeps(this.ttriger)")
}
/** OP */
{
//! textmacro TM_结构名_OP takes METHOD, API
  method operator $METHOD$ takes nothing returns real
    return $API$(Timers[this.itmt])
  endmethod 
//! endtextmacro
//! runtextmacro TM_结构名_OP("elapsed", "TimerGetElapsed")
//! runtextmacro TM_结构名_OP("remaining", "TimerGetRemaining")
//! runtextmacro TM_结构名_OP("timeout", "TimerGetTimeout")
}
}

/** 初始化 */
{
globals
  // switch
  private boolean Ready = false
endglobals

private function init takes nothing returns nothing
  // prevent reinit
  if Ready then
    return
  endif
  
  
  // switch off
  set Ready = true
endfunction

{
标记
初始化函数 - initializer 
  // 初始化函数
  // 默认 false 否-未初始化 一般用于library
}
}

/** 构造 解析 */
{
  static method create takes integer aired, real ary, boolean abc returns thistype
    // 如果需要自动分配 则使用allocate()
    // 手动分配 可直接进行赋值 0 - 8191
    local thistype ttps = thistype.allocate()
    if ttps == 0 then
      return 0
    endif
    
    set ttps.red = aired
    set ttps.y = ary
    set ttps.c = abc
    
    return ttps
  endmethod
  
  method destroy takes nothing returns nothing
    if this != 0 then
      
      // deallocate()是配合 allocate()使用的
      // 在手动解析之后 调用系统解析 回收编号
      call this.deallocate()
    endif
    debug call zclDebugs.log("结构名 ... destroyed!")
  endmethod
  
{
constructor
  // 构造函数
  static method create takes nothing returns thistype
    local thistype ttps = thistype.allocate()
    if ttps == 0 then
      debug call zclDebugs.log("严重错误: zclLinkedListUnits ... 创建失败...有没有对不需要的结构实例放任不管？？")
      return 0
    endif
  
    return ttps
  endmethod

destructor
  // 解析函数
  method destroy takes nothing returns nothing
    // 在手动解析之后 调用系统解析
    call this.deallocate()
    if this != 0 then
      
      
      // 在手动解析之后 调用系统解析 回收编号
      call this.deallocate()
    endif
    debug call zclDebugs.log("结构名 ... destroyed!")
  endmethod
  
  // 在实例调用destroy()时自动call该函数
  private method onDestroy takes nothing returns nothing 
  
  endmethod
}
}

/** 语法要点 */
{
/* 修饰符
library 库 -起始标识 会将代码放置在脚本顶端，可以将库看成是一个拥有与库名相同的域
    initializer 初始化方法，使用 ExecuteFunc 调用
    requires 前置库
    optional 可选的前置库
  
  endlibrary 库 -结束标识
  
globals 全局声明 -起始标识
    public 公有 库名+变量名
    private 私有
  
  endglobals 全局声明 -结束标识
  
scope 域 -起始标识 不会将代码放置在 脚本顶端
  initializer 初始化方法，使用 call 调用
    heavy process
      better use a library initializer
      or call a subfunction using ExecuteFunc from the scope initializer.
  public  公有 域内外都可使用
    原理:固定名 =    SCP_ + 名字     =  库名/域名 + 下划线 + 名字
    function 能被用于 ExecuteFunc 或者 real变量事件，但必须使用 固定名
  private 私有 域内随意使用，域外禁止使用，同时使之优先级[覆盖之前的定义]最高
    原理:随机命名  =  scopename(random digit)__   + 名字     
    引用 SCOPE_PRIVATE       用于 ExecuteFunc


  endscope 域 -结束标识

struct 结构 -起始标识
  public struct 固定命名 使用时需要加上 库名或域名
    结构成员 默认为 public
  private struct 随机命名
  struct 常量名 使用时只需要使用 原名
    static 静态 能直接在 结构名后.调用 不需要实例化
      可以使用 private 关键字
      能作为 code 参数
    this 关联当前 结构实例
      可以使用 . 代替该关键字
    method
      可以在 global 块以外的地方使用
      不能在method内使用
        wait
        sync native
        GetTriggeringTrigger() 
    static method create takes real a, real b, real c returns encap
      struct.allocate()  自定义 结构 crete 方式时 必须调用该方法
    static method destroy takes nothing returns nothing
      struct.deallocate() 自定义 结构 destroy 方式时 必须调用该方法
    method onDestroy takes nothing returns nothing
      调用 destroy 方法时 自动调用
      不知道 能否 private 修饰
    static method onInit takes nothing returns nothing 地图初始化时自动调用
      private
      public
      在所有 library 的 initializer 之前 执行
      在所在 library 的 scope 的 initializer 之前 执行
      不同结构的 onInit 方法执行顺序 基于脚本中被发现的位置，先发现先执行
      
    
  endstruct 结构 -结束标识
*/
}




















































