$('body').terminal({
  //commands
    help: function() {
      this.echo("");
      this.echo("help - Shows this");
      this.echo("fix [ID] - Displays mainetence updates for project");
      this.echo(`print "[STRING]" - Prints string you wrote`);
      this.echo("clear - Clears the screen");
      this.echo("+rep - Trigger data sweep causing the site to appear higher in search results");
      this.echo("credits - Shows credits");
      this.echo("");
    },
    print: function(string) {
      this.echo(string);
    },
    fix: async function(id) {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms)); //delay maker

      if (id == "0828392850#92883&103") {
          this.echo("ID accepted. Fetching...");
          await delay(150); //ms (2500 is 2 seconds)
          this.echo("\nLoaded: luxorens' website v1.3\nStatus: [[;green;]ONLINE]\n\nAuto-log:\nLast maintenance update was performed on November 27, 2024. Fixes to major issue [DEVICE.AUTOSCALE] were successful.\n\nRepairs conducted:\n[DEVICE.AUTOSCALE], [ADMIN.GETPASS]\n");
      }
      else if (id == "6823829770#55732&001") {
        this.echo("ID accepted. Fetching...");
        await delay(1500);
        this.echo("\nLoaded: Lemon Clicker v0.2.1\nStatus: [[;green;]ONLINE]\n\nAuto-log:\nLast maintenance update was performed on December 19, 2024. Fixes to major issues [SAVEFILE] and [SERVER.AUTOUPDATE] were successful. Further examination is ongoing.\n\nRepairs conducted:\n[SAVEFILE], [SERVER.AUTOUPDATE], [EARLYACCESSENTRY]\n");
      }
      else if (id == "1426284710#55920&000") {
        this.echo("ID accepted. Fetching...");
        await delay(1500);
        this.echo("\nLoaded: Music v1.0\nStatus: [[;green;]ONLINE]\n\nAuto-log:\nLast maintenance update was performed on January 6, 2025. No major issues were reported.\n\nRepairs conducted:\n[AUDIOPLAYER], [MP3.COMPATIBILITY]\n");
      }
      else if (id == "7770293852#18883&002") {
        this.echo("ID accepted. Fetching...");
        await delay(1500);
        this.echo("\nLoaded: Scribbles v1.1.1\nStatus: [[;green;]ONLINE]\n\nAuto-log:\nLast maintenance update was performed on February 4, 2025. No major issues were reported.\n\nRepairs conducted:\n[COMMENT-SUBMITTER], [JUMPTOCOMMENTS]\n");
      }
      else if (id == "5553840168#31056&000") {
        this.echo("ID accepted. Fetching...");
        await delay(1500);
        this.echo("\nLoaded: theluxengine v1.5\nStatus: [[;yellow;]SERVICE-STANDBY]\n\nAuto-log:\nService is currently on standby. Projects and websites associated with the service are still online.\nLast maintenance update was performed on Februrary 27, 2025. Fixes to major issues [ENGINE-HOTWORK], [CONTACTSUBMISSION] and [LXCODECFILESERVICE] were successful.\n\nRepairs conducted:\n[ENGINE-HOTWORK], [CONTACTSUBMISSION], [LXCODECFILESERVICE]\n");
      }
      else if (id == "3468591222#00127&456") {
      this.echo("ID accepted. Fetching...");
      await delay(1500);
      this.echo("\nLoaded: Photos v1.0\nStatus: [[;red;]OFFLINE]\n\nAuto-log:\nFile work not finished. Page is still being constructed as of February 4, 2025.\n\nRepairs conducted:\n\n");
    }
      else {
        this.echo("[[;red;]Error: Fix ID invalid!]");
      }
    },
    test: function() {
      this.echo("\nLoaded: luxorens' website v1.3\nID: 0828392850#92883&103\n\nStatus: ONLINE");
    },
    '+rep': async function() {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms)); //delay maker
      this.echo("Sweeping...");
      await delay(500);
      this.echo("[[;yellow;]\nThanks!]\n");
    },
    credits: function () {
      this.echo("\nLUXORENSWEBISTE-2023CREDITS\n\nCreated by: Luxorens\nPowered by: theluxengine\nOG-Tag: theluxsite.coolpage.biz\n\n[[;aqua;]HAVE FUN]\n")
    },
    ask: function(command) {
            const question = command.trim(); // Trim whitespace from the command
            const term = this;

            if (question) {
                // Send the question to the PHP script using AJAX
                $.ajax({
                    url: 'handle_question.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { question: question },
                    success: function(response) {
                        if (response.status === 'success') {
                            term.echo(`Success: ${response.message}`);
                        } else {
                            term.error(`Error: ${response.message}`);
                        }
                    },
                    error: function(xhr, status, error) {
                        term.error(`AJAX Error: ${error}`);
                    }
                });
            } else {
                term.error('Please provide a question. Usage: ask Your question here');
            }
        }
}, {
    greetings: 'LUXOS TERMINAL v1.1\nEnter help for a list of commands\n',
    prompt: ">"
});
