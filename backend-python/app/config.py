import os
from dotenv import load_dotenv

load_dotenv()

NODE_GRAPH_URL = os.getenv("NODE_GRAPHQL_URL", "http://localhost:3000/graphql")