'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var github = tslib_1.__importStar(require("@actions/github"));
var core = tslib_1.__importStar(require("@actions/core"));
var token = core.getInput("token");
var head = core.getInput("head");
var base = core.getInput("base");
var develop_branch = core.getInput("develop_branch");
var title = core.getInput("title");
var body = core.getInput("body");
function main() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, owner, repo, octokit, developRef, ref, err_1, pullrequest;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("auto release");
                    _a = github.context.repo, owner = _a.owner, repo = _a.repo;
                    octokit = github.getOctokit(token);
                    return [4 /*yield*/, octokit.git.getRef({
                            owner: owner,
                            repo: repo,
                            ref: "heads/" + develop_branch,
                        })];
                case 1:
                    developRef = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 8]);
                    return [4 /*yield*/, octokit.git.getRef({
                            owner: owner,
                            repo: repo,
                            ref: "heads/" + head,
                        })];
                case 3:
                    ref = _b.sent();
                    return [3 /*break*/, 8];
                case 4:
                    err_1 = _b.sent();
                    if (!(err_1.status === 404)) return [3 /*break*/, 7];
                    return [4 /*yield*/, octokit.git.createRef({
                            owner: owner,
                            repo: repo,
                            ref: "refs/heads/" + head,
                            sha: developRef.data.object.sha,
                        })];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, octokit.pulls.create({
                            owner: owner,
                            repo: repo,
                            head: "refs/heads/" + head,
                            base: "refs/heads/" + base,
                            title: title,
                            body: body,
                        })];
                case 6:
                    pullrequest = _b.sent();
                    console.log(pullrequest);
                    _b.label = 7;
                case 7: return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=main.js.map
