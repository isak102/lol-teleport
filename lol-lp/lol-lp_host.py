#!/usr/bin/env -S python3 -u
# CREDIT: https://github.com/guest271314/native-messaging-python/blob/main/nm_python.py
# https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging
# https://github.com/mdn/webextensions-examples/pull/157
# Note that running python with the `-u` flag is required on Windows,
# in order to ensure that stdin and stdout are opened in binary, rather
# than text, mode.

import json
import struct
import subprocess
import sys
import traceback

LOG_FILE = "/tmp/nm_python.log"


# Python 3.x version
# Read a message from stdin and decode it.
def getMessage():
    rawLength = sys.stdin.buffer.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack("@I", rawLength)[0]
    message = sys.stdin.buffer.read(messageLength).decode("utf-8")
    jsonMessage = json.loads(message)

    if jsonMessage["summoner_name"] and jsonMessage["region"]:
        subprocess.Popen(
            [
                "lol-lp",
                "-r",
                jsonMessage["region"],
                "-i",
                jsonMessage["summoner_name"],
                "--notify",
            ],
        )

    return jsonMessage


# Encode a message for transmission,
# given its content.
def encodeMessage(messageContent):
    # https://stackoverflow.com/a/56563264
    # https://docs.python.org/3/library/json.html#basic-usage
    # To get the most compact JSON representation, you should specify
    # (',', ':') to eliminate whitespace.
    encodedContent = json.dumps(messageContent, separators=(",", ":")).encode("utf-8")
    encodedLength = struct.pack("@I", len(encodedContent))
    return {"length": encodedLength, "content": encodedContent}


# Send an encoded message to stdout
def sendMessage(encodedMessage):
    sys.stdout.buffer.write(encodedMessage["length"])
    sys.stdout.buffer.write(encodedMessage["content"])
    sys.stdout.buffer.flush()


try:
    while True:
        receivedMessage = getMessage()
        sendMessage(encodeMessage({"status": "success", "message": "lol-lp started"}))

except Exception as e:
    sys.stdout.buffer.flush()
    sys.stdin.buffer.flush()
    # https://discuss.python.org/t/how-to-read-1mb-of-input-from-stdin/22534/14
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        traceback.print_exc(file=f)
    sendMessage(encodeMessage({"status": "error", "message": str(e)}))
    sys.exit(0)
