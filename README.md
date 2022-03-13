# Stats for your README.md

## Reference

### GitHub profile statistics

Copy the piece of code from below and paste it into your markdown.<br/>
**Change** the value of `username=` to your GitHub's username.
<br>
<br>
```md
  [![My Stats](https://github-stats-evirunurm.vercel.app/api/stats.js?username=evirunurm)](https://github.com/evirunurm/github-stats)
```
<br>
`/api/stats.js` endpoint accepts the following parameters.<br>
A query parameter must follow the `parameter=value` structure.<br>
Several parameters must go separated by `&`

| Parameter | Type     | Description                                                                                 |
| :-------- | :------- |:--------------------------------------------------------------------------------------------|
| `username` | `string` | **Required**. Your GitHub username                                                          |
| `color` | `"white"` | Set to "white" if you want the background to be white                                       |
| `peng` | `boolean` | If you want the GitHub icon<br/>instead of the cute little <br/>penguin, set this to false. |
<br>

### Most used languages 

Copy the piece of code from below and paste it into your markdown.<br/>
**Change** the value of `username=` to your GitHub's username.
<br>
<br>
```md
  [![My languages](https://github-stats-evirunurm.vercel.app/api/langauges.js?username=evirunurm)](https://github.com/evirunurm/github-stats)
```
<br>
`/api/languages.js` endpoint accepts the following parameters.<br>
A query parameter must follow the `parameter=value` structure.<br>
Several parameters must go separated by `&`

| Parameter  | Type     | Description                                                                            |
|:-----------| :------- |:---------------------------------------------------------------------------------------|
| `username` | `string` | **Required**. Your GitHub username                                                     |
| `color`    | `"white"` | Set to "white" if you want the background to be white                                  |
| `pie`      | `boolean` | If you don't want the pie chart but want percentage bars instead, set this to "false". |
<br>

## Examples
### GitHub profile statistics

| Parameter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Output                                                                                                                           |
| :-------- |:---------------------------------------------------------------------------------------------------------------------------------|
|  &nbsp;default&nbsp;  | <br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260" src="https://i.imgur.com/4FkYASY.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br> |
|  &nbsp;`peng=false`&nbsp;  | <br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260" src="https://i.imgur.com/1GbRlFE.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>            |
|  &nbsp;`color=white`&nbsp;  | <br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260"  src="https://i.imgur.com/pqulod5.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>             |
<br>

### Most used languages

| Parameter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Output |
|:-----------------------------------------------------------------------------------------------------------------| :------- |
| &nbsp;default&nbsp; |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260" src="https://i.imgur.com/hQBPCiO.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|
| &nbsp;`pie=false`&nbsp; |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260"  src="https://i.imgur.com/pgQWL8G.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|
| &nbsp;`color=white`&nbsp;   |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260"  src="https://i.imgur.com/xJgjdxN.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|
| &nbsp;`color=white&pie=false`&nbsp;  |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img width="260"  src="https://i.imgur.com/AxROUMS.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|
<br>
