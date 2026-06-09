class ActivityWSClient {
  private ws: WebSocket | null = null
  private url: string
  private listeners: Map<string, Set<(data: any) => void>> = new Map()
  private reconnectInterval: NodeJS.Timeout | null = null
  private reconnectDelay = 3000

  constructor(url: string = 'ws://localhost:3001') {
    this.url = url
  }

  connect() {
    if (typeof window === 'undefined') return

    try {
      this.ws = new WebSocket(this.url)

      this.ws.onopen = () => {
        console.log('[WS] Connected')
        this.emit('connected')
        if (this.reconnectInterval) {
          clearInterval(this.reconnectInterval)
          this.reconnectInterval = null
        }
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.emit('activity', data)
        } catch (error) {
          console.error('[WS] Parse error:', error)
        }
      }

      this.ws.onerror = (error) => {
        console.error('[WS] Error:', error)
        this.emit('error', error)
      }

      this.ws.onclose = () => {
        console.log('[WS] Disconnected')
        this.emit('disconnected')
        this.reconnect()
      }
    } catch (error) {
      console.error('[WS] Connection error:', error)
      this.reconnect()
    }
  }

  private reconnect() {
    if (this.reconnectInterval) return

    this.reconnectInterval = setInterval(() => {
      console.log('[WS] Attempting reconnect...')
      this.connect()
    }, this.reconnectDelay)
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)

    return () => {
      this.listeners.get(event)?.delete(callback)
    }
  }

  private emit(event: string, data?: any) {
    this.listeners.get(event)?.forEach(callback => callback(data))
  }

  send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    }
  }

  disconnect() {
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval)
      this.reconnectInterval = null
    }
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  isConnected() {
    return this.ws?.readyState === WebSocket.OPEN
  }
}

export const wsClient = new ActivityWSClient()
