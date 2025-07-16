const update_history = [
  { version: "b1.0", desc: "整合包基础打包完成" },
  { version: "b1.0.1", desc: "[命令]/ktp用于无权限传送，但跨维度传送会忽略维度信息" },
  { version: "b1.0.2", desc: "[配方]匠魂黏液水晶块粉碎轮破碎" },
  { version: "b1.1", desc: "[模组]时装盔甲（重置版）" },
  { version: "b1.1.1", desc: "[配方]海晶沙粒→末影珍珠粒的龙息鼓风机修改回末影珍珠" },
  { version: "b1.1.2", desc: "[命令]/ktp命令的跨维度传送增加了无法传送提醒" },
  { version: "b1.1.3", desc: "[配方]（二重）压缩加速火把的无配方提示配方" },
  { version: "b1.2", desc: "[模组]全域点歌" },
  { version: "b1.2.1", desc: "[物品]染料可食用" },
  { version: "b1.2.2", desc: "[物品]染料食用效果修改" },
  { version: "b1.3", desc: "[模组]玉米乐事；需要探索新地图以获取新作物" },
  { version: "b1.3.1", desc: "[配方]矿石开掘的植物魔法/神话植物学挖掘配方修改至阿尔夫海姆维度" },
  { version: "b1.3.2", desc: "[命令]增加了查询更新历史的/kiane_history" },
  { version: "b1.3.3", desc: "[事件]修复了登入提醒版本的事件" },
  { version: "b1.3.4", desc: "[事件/命令]优化了登入提醒版本事件和查询更新历史命令的格式化文本" },
  { version: "b1.3.5", desc: "[配方]b1.3.1的应用失败被修改，目前矿石开掘不生成对应矿物" },
  { version: "b1.3.6", desc: "[配方]各种原版材料刀具的「冶炼」配方" },
  { version: "b1.4", desc: "[物品]对时间之瓶相关合成增加了中间件【时间核心】" },
  { version: "b1.5", desc: "[模组]更新了部分模组版本, 移除了部分未更新扩展模组, 移除了部分存在率低的模组, 添加了【女仆实用任务】等实用模组, 增改了【时间核心】相关物品及配方" },
  { version: "b1.5.1", desc: "[模组]替换了模组【更多箱子】为【扩展存储】；修复了命令有效性" },
  // { version: "", desc: "刀具的冶炼配方" },
  // { version: "", desc: "下界合金刀具的熔铸配方" },
  // { version: "", desc: "特殊村民汉化" },
  // { version: "", desc: "神话植物学-源质钢剑指南文本汉化修改" },
  // { version: "", desc: "筛子的配方平衡" },
  // { version: "", desc: "锦致装饰末影人头颅的匠魂可熔炼性" },
  // { version: "", desc: "夸克金栏杆的匠魂可熔炼性" },
  // { version: "", desc: "各种刀具的匠魂可熔炼性" },
  // { version: "", desc: "虚空钢的匠魂液体" },
  // { version: "", desc: "暮色的各种匠魂液体" },
  // { version: "", desc: "ktp相关修改（ktp传送的是否允许）" },
  // { version: "", desc: "优化项：机械动力配方的去Addon化" },
];

const versions = update_history.map(item => item.version);
const newestVersion = versions[versions.length - 1];
const oldestVersion = versions[0];

PlayerEvents.loggedIn(event => {
  if (versions.length === 0) return;

  const player = event.player;

  // 获取未完成的版本更新
  const updatesToShow = update_history.filter(item => !player.stages.has(item.version));

  if (updatesToShow.length > 0) {
    player.tell("§3================= [kiane] =================");
    player.tell("§b感谢游玩 §6GoldSheep3 §b制作的休闲整合 §9朝暮拾光 §b！");
    player.tell(
      Text.of(`§b当前版本为 §9${newestVersion} §b。遇到问题或建议可加QQ群: §e972459989`)
        .clickCopy("972459989")
        .hover("§b点击复制群号: §e972459989")
    );

    // 新玩家处理
    if (!player.stages.has('kiane_beforetomorrow_joined')) {
      player.stages.add('kiane_beforetomorrow_joined');
      update_history.forEach(v => player.stages.add(v.version));  // 标记所有版本为已完成
      player.tell("§b祝你游玩愉快！");
    } else {
      player.tell("§b更新内容:");
      updatesToShow.forEach(item => {
        player.stages.add(item.version);
        player.tell(`§b- §9${item.version}§b: §a${item.desc}`);
      });
    }

    player.tell("§3==========================================");
  }
});

ServerEvents.commandRegistry(event => {
  const { commands: Commands } = event;

  event.register(
    Commands.literal("kiane_history")
      .executes(value => {
        // 命令执行安全检查
        if (!value.source.player) {
          value.source.sendFailure("仅玩家可执行此命令");
          return 0;
        }

        const player = value.source.player;
        player.tell("§3=========== [kiane] §b整合更新日志 §3===========");

        // 按版本顺序显示完整日志
        update_history.forEach(item => {
          player.tell(`§b>> §9${item.version}§b: §a${item.desc}`);
        });

        player.tell("§3==========================================");
        return 1;
      })
  );
});
