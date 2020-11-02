import * as github from "@actions/github";
import * as core from "@actions/core";

const token = core.getInput("token");
const head = core.getInput("head");
const base = core.getInput("base");
const develop_branch = core.getInput("develop_branch");
const title = core.getInput("title");
const body = core.getInput("body");

async function main() {
  core.info("start auto releasing...");

  const { owner, repo } = github.context.repo;

  const octokit = github.getOctokit(token);

  const developRef = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${develop_branch}`,
  });

  try {
    const ref = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${head}`,
    });
    core.info(`${head} already exists, skiping auto release.`);
  } catch (err) {
    if (err.status === 404) {
      await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${head}`,
        sha: developRef.data.object.sha,
      });

      core.info("start creating pull request");
      const pullrequest = await octokit.pulls.create({
        owner,
        repo,
        head: `refs/heads/${head}`,
        base: `refs/heads/${base}`,
        title,
        body,
      });
      core.info(
        `pull request is created successfully. pull request number ${pullrequest.data.number}`
      );
    }
  }
}

main();
