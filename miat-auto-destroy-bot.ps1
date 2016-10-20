# delete all branches on the origin which have been merged except for the specified below e.g. develop, master and release branches.

git checkout develop
git pull
git remote prune origin
git branch -r --merged |
    ForEach-Object {$_.split(' ')[2]} |
    ForEach-Object {$_.substring(7)} |
    Where-Object { $_ -notlike 'HEAD' -and $_ -notlike 'develop' -and $_ -notlike 'master' -and $_ -notlike 'release/*' } |
    %{ git push origin :$_ }