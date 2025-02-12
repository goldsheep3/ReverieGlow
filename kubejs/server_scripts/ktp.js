/*
 * 不需要op权限的ktp直接传送指令。
 * 跨维度传送会提醒无法传送。
 * NextFixPlan: 设置角色是否允许ktp。
**/

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event
    event.register(
        Commands.literal("ktp")
            .then(
                Commands.argument('playerName', Arguments.PLAYER.create(event))
                    .executes(value => {
                        const player2 = Arguments.PLAYER.getResult(value, "playerName")
                        const player1 = value.source.player
                        
                        if (player1.level.dimension != player2.level.dimension) {
                            player1.tell("§3[ktp] 无法传送到 §2" + player2.username + " §3的位置。")
                            player1.tell("§3[ktp] 对方正处于 §c" + player2.level.dimension + " §3维度。")
                        }
                        else {
                            player1.tell("§b[ktp] 成功传送到 §2" + player2.username + " §b的位置！")
                            player2.tell("§b[ktp] §2" + player1.username + " §b将要传送到你的位置。")
                            player1.setPositionAndRotation(player2.x, player2.y, player2.z, player2.yaw, player2.pitch)
                            console.log(player1.username + "传送到了" + player2.username + "的位置：x=" + player2.x + ", y="+ player2.y + ", z="+ player2.z)
                        }
 
                        return 1
                        
                    })       
            )
    )
})
