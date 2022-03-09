# Stats for your README.md

## Reference

#### GitHub profile statistics

Copy the piece of code from below and paste it into your markdown.<br/>
**Change** the value of `username=` to your GitHub's username.

```md
  [![My Stats](https://github-stats-evirunurm.vercel.app/api/app.js?username=evirunurm)](https://github.com/evirunurm/github-stats)
```

`/api/app.js` endpoint accepts the following parameters.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your GitHub username |
| `color` | `"white"` | Set to "white" if you want background to be white |
| `peng` | `boolean` | If you want the GitHub icon<br/>instead of the cute little <br/>penguin, set this to false. |
   
A query parameter must follow the `parameter=value` structure.

Several parameters must go separated by `&`


## Examples

| Parameter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Output |
| :-------- | :------- |
|  &nbsp;default&nbsp;  |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img height="150" src="https://i.imgur.com/4FkYASY.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|
|  &nbsp;`color=white`&nbsp;  |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img height="150" src="https://i.imgur.com/rh1G2X0.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|
|  &nbsp;`peng=false`&nbsp;  |<br>&nbsp;&nbsp;&nbsp;&nbsp;<img height="150" src="https://i.imgur.com/1GbRlFE.png">&nbsp;&nbsp;&nbsp;&nbsp;<br><br>|

