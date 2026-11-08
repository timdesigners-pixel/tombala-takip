#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ASTRA TOMBALA OS - Sıfır Bağımlılık Python 3 Wi-Fi Erişim Noktası ve Senkron Sunucusu
Herhangi bir harici kütüphane gerektirmez (Standart kütüphane ile çalışır).
"""

import http.server
import socketserver
import json
import os
import socket
import sys

PORT = 8080
WWW_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'www')

game_state = {
    "called": [],
    "history": [],
    "cards": [],
    "TARGET": "c1",
    "doneFlags": {"c1": False, "c2": False},
    "extFlags": {"c1": False, "c2": False},
    "lastMark": None,
    "revision": 0
}

def get_local_ip():
    try:
        s = socket.socket(socket.AF_AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class TombalaHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WWW_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-Room-Token')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path.startswith('/api/state'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps(game_state).encode('utf-8'))
            return
        super().do_GET()

    def do_POST(self):
        global game_state
        if self.path.startswith('/api/state'):
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body)
                new_state = data.get('state', data)
                game_state.update(new_state)
                game_state['revision'] += 1
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "revision": game_state['revision'], "state": game_state}).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
            return
        self.send_response(404)
        self.end_headers()

def main():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), TombalaHandler) as httpd:
        local_ip = get_local_ip()
        print("=" * 64)
        print("🚀 ASTRA TOMBALA OS · PYTHON WI-FI ERİŞİM NOKTASI SUNUCUSU")
        print("=" * 64)
        print(f"👉 Yerel Wi-Fi / Hotspot Bağlantı Adresi : http://{local_ip}:{PORT}")
        print(f"👉 Localhost (Bu cihaz)               : http://localhost:{PORT}")
        print("=" * 64)
        print("Durdurmak için Ctrl+C tuşlarına basın.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nSunucu kapatıldı.")

if __name__ == '__main__':
    main()
