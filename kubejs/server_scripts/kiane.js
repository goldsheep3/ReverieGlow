const update_history = {
  "b1.0": "整合包基础打包完成",
  "b1.0fix1": "新增：[命令]/ktp用于无权限传送，但跨维度传送会忽略维度信息",
  "b1.0fix2": "新增：[配方]匠魂黏液水晶块粉碎轮破碎",
  "b1.1": "新增：[模组]时装盔甲（重置版）",
  "b1.1fix1": "修改：[配方]海晶沙粒→末影珍珠粒的龙息鼓风机修改回末影珍珠",
  "b1.1fix2": "修改：[命令]/ktp命令的跨维度传送增加了无法传送提醒",
  "b1.1fix3": "新增：[配方]（二重）压缩加速火把的无配方提示配方",
  "b1.2": "新增：[模组]全域点歌",
  "b1.2fix1": "修改：[物品]染料可食用",
  "b1.2fix2": "修改：[物品]染料食用效果修改",
  "b1.3": "新增：[模组]玉米乐事；需要探索新地图以获取新作物",
  "b1.3fix1": "修改：[配方]矿石开掘的植物魔法/神话植物学挖掘配方修改至阿尔夫海姆维度",
  "b1.3fix2": "新增：[命令]增加了查询更新历史的/kiane_update_history",
  "b1.3fix3": "修改：[事件]修复了登入提醒版本的事件",
  "b1.3fix4": "修改：[事件/命令]优化了登入提醒版本事件和查询更新历史命令的格式化文本",
  "b1.3fix5": "修改：[配方]b1.3fix1的应用失败被修改，目前矿石开掘不生成对应矿物",
  "b1.3fix6": "新增：[配方]各种原版材料刀具的「冶炼」配方",
}
/**
    Next Fix Plan
    - 刀具的冶炼配方
    - 下界合金刀具的熔铸配方
    - 特殊村民汉化
    - 神话植物学-源质钢剑指南文本汉化修改
    - 筛子的配方平衡
    - 锦致装饰末影人头颅的匠魂可熔炼性
    - 夸克金栏杆的匠魂可熔炼性
    - 各种刀具的匠魂可熔炼性
    - 虚空钢的匠魂液体
    - 暮色的各种匠魂液体
    - ktp相关修改（ktp传送的是否允许）
    - 优化项：机械动力配方的去Addon化
*/
const versions = Object.keys(update_history)

const newestVersion = versions[versions.length - 1]
const oldestVersion = versions[0]

PlayerEvents.loggedIn(event => {
  const player = event.player

  // 检查玩家的版本阶段情况
  let updatesToShow = []
  versions.forEach(currentVersion => {
    if (!player.stages.has(currentVersion)) {
      updatesToShow.push(currentVersion)
    }
  })
  // 若版本阶段不为空，则进行提醒
  if (updatesToShow.length > 0) {
    player.tell("§3================= [kiane] =================")
    player.tell("§b感谢游玩 §6GoldSheep3 §b制作的 §9Before Tomorrow §b休闲整合！")
    player.tell(
      Text.of(`§b当前版本为 §9${newestVersion} §b。遇到问题或建议可加QQ群: §e972459989`)
        .clickCopy("972459989")
        .hover("§b点击复制群号: §e97245998")
    )

    if (!player.stages.has(oldestVersion)) {
      // 新玩家
      versions.forEach(v => player.stages.add(v)) // 将所有版本标记为已完成
      player.tell("§b祝你游玩愉快！")
    } else {
      // 老玩家
      player.tell("§b更新内容:")
      updatesToShow.forEach(v => {
        player.tell(`§b- §9${v}§b: §a${update_history[v]}`)
        player.stages.add(v)
      })
    }
    player.tell("§3===========================================")
  }
})

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event
  event.register(
    Commands.literal("kiane_history")
      .executes(value => {
        const player = value.source.player
        player.tell("§3======= [kiane] §bModpack Update Logs §3=======")
        versions.forEach(v => player.tell(`§b- §9${v}§b: §a${update_history[v]}`))
        player.tell("§3===========================================")
        return 1
      }))
})
