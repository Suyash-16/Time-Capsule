const cron = require("node-cron");
const Capsule = require("../models/capsule");
const { sendCapsuleEmail } = require("../services/mailer");

function startCapsuleScheduler() {
  cron.schedule("*", async () => {
    console.log("Running scheduler:", new Date().toISOString());

    const dueCapsules = await Capsule.find({
      sent: false,
      sendAt: { $lte: new Date() }
    });

    if (dueCapsules.length === 0) return;

    console.log("Found due capsules:", dueCapsules.length);

    for (const capsule of dueCapsules) {
      try {
        await sendCapsuleEmail(
          capsule.recipients,
          `Time Capsule: ${capsule.title}`,
          capsule.message
        );

        capsule.sent = true;
        await capsule.save();
        console.log(`Sent capsule ${capsule._id}`);

      } catch (err) {
        console.error("Error sending capsule:", err);
      }
    }
  });
}

module.exports = startCapsuleScheduler;
